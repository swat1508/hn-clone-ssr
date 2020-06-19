import React from 'react';
import './style.css';
import Row from './Row';

const Content = (props) => {
  const { list, deleteRow, upVote } = props;
  return (
    <React.Fragment>
      <table>
        {list && list.map(fact => (
          fact.num_comments
            && <Row fact={fact} deleteRow={deleteRow} upVote={upVote} />
        ))}


      </table>
    </React.Fragment>
  );
};

export default Content;
