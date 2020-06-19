import React from 'react';
import './style.css';

export default class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fact: this.props.fact
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      fact: newProps.fact
    });
  }

  render() {
    const { fact } = this.state;
    return (
      <tr key={fact.objectID}>
        <td>{fact.num_comments}</td>
        <td>
          {fact.points}
          {' '}
          <input type="button" value="&#x25B2;" onClick={() => this.props.upVote(this.state.fact.objectID)} />
        </td>
        <td>
          {fact.title}
          {' '}
          by
          {' '}
          {fact.author}
        </td>
        <td><input type="button" value="[Hide]" onClick={() => this.props.deleteRow(this.state.fact.objectID)} /></td>
      </tr>
    );
  }
}
