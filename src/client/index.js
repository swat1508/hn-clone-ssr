import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.hydrate(<App list={window.__INITIAL_PROPS__} />, document.querySelector('#root'));
