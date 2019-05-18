import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export default (store) => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'));
};
