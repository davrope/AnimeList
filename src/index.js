import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import axios from 'axios';


import App from './App';
import './index.css';
import reducers from './reducers'

window.axios = axios;
const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(reduxThunk)))

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
