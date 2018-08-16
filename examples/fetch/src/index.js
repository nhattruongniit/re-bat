import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from './store'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

console.log(App)


ReactDOM.render(
<Provider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>
  , document.getElementById('root'));
registerServiceWorker();
