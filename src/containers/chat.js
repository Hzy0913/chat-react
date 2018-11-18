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
  state = {
    messages: [
      {
        timestamp: 1521000392465,
        userInfo: {
          avatar: 'http://img.binlive.cn/1.png',
          userId: '412312123123',
          name: '啦啦啦啦'
        },
        value: '[哈哈]123123[123][哈哈]123123哈哈哈哈ashdasd'
      },
      {
        timestamp: 1542423382465,
        userInfo: {
          avatar: 'http://img.binlive.cn/1.png',
          userId: '412312123123',
          name: '啦啦啦啦'
        },
        value: '[哈哈]123123[123][哈哈]123123哈哈哈哈ashdasd'
      },
      {
        timestamp: 1542448745336,
        userInfo: {
          avatar: 'http://img.binlive.cn/1.png',
          userId: 'ad123123123',
          name: '啦啦啦啦'
        },
        value: '[哈哈]123123[123][哈哈]123123哈哈哈哈ashdasd'
      },
      {
        timestamp: 1542448795336,
        userInfo: {
          avatar: 'http://img.binlive.cn/1.png',
          userId: 'ad123123123',
          name: '啦啦啦啦'
        },
        value: '[哈哈]123123[123][哈哈]123123哈哈哈哈ashdasd'
      }
    ]
  }
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }
  sendMessage = (v) => {
    const {messages} = this.state;
    messages.push(v);
    this.setState({messages});
    console.log(v);
  }
  render() {
    const {messages} = this.state;
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
        <ChatInput
          sendMessage={this.sendMessage}
          userInfo={{
            userId: '412312123123',
            avatar: 'http://img.binlive.cn/1.png',
            name: '啦啦啦啦'
          }}
        />
        <div className="chat-content" style={{height: 4000}}>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <Messages
            dataSource={messages}
            userInfo={{
              userId: '412312123123',
              avatar: 'http://img.binlive.cn/1.png',
              name: '啦啦啦啦'
            }}
          />
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
