import React from 'react';
import ReactDOM from 'react-dom';
import {Provider,connect} from 'react-redux';

import store from './store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, withRouter } from 'react-router-dom';

const mapStateToProps = state => store;
const AppWithRouter = withRouter(App);
const ConnectedAppWithRouter = connect(mapStateToProps)(AppWithRouter)
ReactDOM.render(
  <Provider  store={store}>
    <BrowserRouter>
      <ConnectedAppWithRouter/>
    </BrowserRouter>

  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


