import React from 'react';
import fetch from 'node-fetch';
import './app.css';
import Header from './components/Header';
import Content from './components/Content';
import MyChart from './components/Graph';


class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hackerData: this.props.list.hits,
      pageNum: 0,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const data = this.getLocalStorageData();
    if (data) {
      this.setState({ hackerData: data });
    } else {
      this.setState({ hackerData: this.props.list.hits });
    }
  }

  getLocalStorageData = () => localStorage.getItem('hackerData') && JSON.parse(localStorage.getItem('hackerData'))[this.state.pageNum];

  setLocalStorageData = () => {
    let hackerdata = {};
    if (localStorage.getItem('hackerData')) {
      hackerdata = JSON.parse(localStorage.getItem('hackerData'));
    }
    hackerdata[this.state.pageNum] = this.state.hackerData;
    localStorage.setItem('hackerData', JSON.stringify(hackerdata));
  }

  nextHackerDataRequest = () => {
    this.setState({ pageNum: this.state.pageNum + 1 }, () => {
      const data = this.getLocalStorageData();
      if (data) {
        this.setState({ hackerData: this.getLocalStorageData() });
        history.pushState('', '', `home?page=${this.state.pageNum}`);
        return;
      }
      const url = `https://hn.algolia.com/api/v1/search?hitsPerPage=50&page=${this.state.pageNum}`;
      fetch(url)
        .then(res => res.json())
        .then((data) => {
          this.setState({
            hackerData: data.hits,
          });
        });
      history.pushState('', '', `home?page=${this.state.pageNum}`);
    });
  }

  upVote = (objectID) => {
    const newhackerdata = this.state.hackerData.map((fact) => {
      if (fact.objectID === objectID) {
        fact.points += 1;
      }
      return fact;
    });
    this.setState({ hackerData: newhackerdata }, () => this.setLocalStorageData());
  }

  deleteRow = (objectID) => {
    const newhackerdata = this.state.hackerData.filter(fact => fact.objectID !== objectID);
    this.setState({ hackerData: newhackerdata }, () => this.setLocalStorageData());
  }

  render() {
    const { hackerData } = this.state;
    return (
      <React.Fragment>
        <div className="mainContainer">
          <Header />
          <Content
            list={hackerData}
            deleteRow={this.deleteRow}
            upVote={this.upVote}
          />
          <input id="moreBtn" type="button" value="More" onClick={this.nextHackerDataRequest} />
          <div className="graphContainer">
            <MyChart list={hackerData} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
