import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from './re-jok'
import registerServiceWorker from './registerServiceWorker';

class ABC extends React.Component {
  render(){
    // console.log("re-render ABC")
    return (
      <h4>ABC</h4>
    )
  }
}

ReactDOM.render(
  <Provider>
    <React.Fragment>
      <App myProps="Hello world"/>
      {/* <Test/> */}
      <ABC/>
    </React.Fragment>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
