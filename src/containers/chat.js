import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {Popover} from 'antd-mobile';
import {ChatInput, Messages} from '../components/chat';


import * as authActions from '../redux/reduces/auth';


@connect(
  state => ({auth: state.auth}),
  dispatch => bindActionCreators(authActions, dispatch)
)
class Login extends Component {
  static propTypes = {
    auth: PropTypes.object
  };
  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }
  sendMessage = (v) => {
    console.log(v);
  }
  render() {
    return (
      <div className="chat-box">
        <div className="chat-top-bar">
          <Popover
            visible
            placement="bottomLeft"
            className="chat-popover"
            overlay={<div>1231231adsadsdas</div>}
            getTooltipContainer={() => document.querySelector('.robot')}
          >
            <div className="robot" />
          </Popover>
          <div className="online-num">
            <span>在线人数</span>
            <i className="iconfont icon-me_surface" />
            <span>1</span>
          </div>
        </div>
        <ChatInput sendMessage={this.sendMessage} />
        <div className="chat-content" style={{height: 4000}}>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <Messages />
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
        </div>
      </div>
    );
  }
}

export default Login;
