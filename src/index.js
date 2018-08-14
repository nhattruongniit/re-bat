import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider, connect } from './re-jok'
import registerServiceWorker from './registerServiceWorker';

class ABC extends React.Component {
  render(){
    return (
      <div>hi</div>
    )
  }
}
ReactDOM.render(
  <Provider>
    <React.Fragment>
      <App myProps="Hello world"/>
      <ABC/>
    </React.Fragment>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
