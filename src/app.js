import React from 'react';
import ReactDOM from 'react-dom';
import {Toast} from 'antd-mobile';
import browserHistory from 'react-router';
import axios from 'axios';
import localStore from 'store';
import createHistory from 'history/createBrowserHistory';
import Root from './router';
import store from './redux';

// css
import './style/index.styl';
// iconfont
import './assets/icon/iconfont.css';
import './assets/icon/iconfont.js';

const history = createHistory();
export default history;
// window object
window.store = store;

window.axios = axios.create({
  baseURL: '/api',
});

const liveid = (localStore.get('user') || {}).token || '';
axios.defaults.headers.liveid = liveid; // axios headers token
window.axios.interceptors.response.use(
  res => res.data,
  err => {
    const {data: {err: errnum, error}} = (err || {}).response;
    if (error) {
      Toast.fail(error);
    }
    if ([403, 401].includes(err.response.status)) {
      localStore.get('user') && localStore.remove('user');
    }
    return Promise.reject(err);
  }
);
ReactDOM.render(<Root />, document.getElementById('app'));
