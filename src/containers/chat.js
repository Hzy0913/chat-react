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
          name: '啦啦啦啦',
        },
        value: '[哈哈]123123[123][哈哈]123123哈哈哈哈ashdasd',
        error: true
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
      },
      {
        timestamp: 1542448795334,
        userInfo: {
          avatar: 'http://img.binlive.cn/1.png',
          userId: 'ad123123123',
          name: '啦啦啦啦'
        },
        value: '[哈哈]123123[123][哈哈]123123哈哈哈哈ashdasd'
      },
      {
        timestamp: 1542448795326,
        userInfo: {
          avatar: 'http://img.binlive.cn/1.png',
          userId: 'ad123123123',
          name: '啦啦啦啦'
        },
        value: '[哈哈]123123[123][哈哈]123123哈哈哈哈ashdasd'
      },
      {
        timestamp: 1542448793336,
        userInfo: {
          avatar: 'http://img.binlive.cn/1.png',
          userId: 'ad123123123',
          name: '啦啦啦啦'
        },
        value: '[哈哈]123123[123][哈哈]123123哈哈哈哈ashdasd'
      }
    ],
    timestamp: new Date().getTime()
  }
  componentDidMount() {
    setTimeout(() => {
      const {messages} = this.state;
      const item = messages.find(v => v.timestamp === 1542423382465);
      console.log(item);
      item.error = false;
      this.setState({messages, timestamp: new Date().getTime()});
    }, 7000);
  }

  componentWillReceiveProps(nextProps) {
  }
  scrolltoupper = (v) => {
    setTimeout(() => {
      this.sendMessage();
      this.setState({loading: false});
    }, 20000);
    this.setState({loading: true});
    console.log(v);
  }
  sendMessage2 = (v) => {
    const {messages} = this.state;
    messages.push(v);
    this.setState({messages, timestamp: new Date().getTime()});
    console.log(v);
  }
  sendMessage = (v) => {
    const {messages} = this.state;
    const newmessages = [
      {
        timestamp: 1542442795326,
        userInfo: {
          avatar: 'http://img.binlive.cn/1.png',
          userId: 'ad123123123',
          name: '啦啦啦啦'
        },
        value: '[哈哈]123123[123][哈哈]123123哈哈哈哈ashdasd'
      },
      {
        timestamp: 1542442143336,
        userInfo: {
          avatar: 'http://img.binlive.cn/1.png',
          userId: 'ad123123123',
          name: '啦啦啦啦'
        },
        value: '[哈哈]123123[123][哈哈]123123哈哈哈哈ashdasd'
      },
      {
        timestamp: 1542442193436,
        userInfo: {
          avatar: 'http://img.binlive.cn/1.png',
          userId: 'ad123123123',
          name: '啦啦啦啦'
        },
        value: '[哈哈]123123[123][哈哈]123123哈哈哈哈ashdasd'
      },
      {
        timestamp: 1542442193333,
        userInfo: {
          avatar: 'http://img.binlive.cn/1.png',
          userId: 'ad123123123',
          name: '啦啦啦啦'
        },
        value: '[哈哈]123123[123][哈哈]123123哈哈哈哈ashdasd'
      },
      {
        timestamp: 1542442193322,
        userInfo: {
          avatar: 'http://img.binlive.cn/1.png',
          userId: 'ad123123123',
          name: '啦啦啦啦'
        },
        value: '[哈哈]123123[123][哈哈]123123哈哈哈哈ashdasd'
      },
      {
        timestamp: 1542442193311,
        userInfo: {
          avatar: 'http://img.binlive.cn/1.png',
          userId: 'ad123123123',
          name: '啦啦啦啦'
        },
        value: '[哈哈]123123[123][哈哈]123123哈哈哈哈ashdasd'
      },
      {
        timestamp: 1542442193211,
        userInfo: {
          avatar: 'http://img.binlive.cn/1.png',
          userId: 'ad123123123',
          name: '啦啦啦啦'
        },
        value: '[哈哈]123123[123][哈哈]123123哈哈哈哈ashdasd'
      },
      {
        timestamp: 1542442192311,
        userInfo: {
          avatar: 'http://img.binlive.cn/1.png',
          userId: 'ad123123123',
          name: '啦啦啦啦'
        },
        value: '111[哈哈]123123[123][哈哈]123123哈哈哈哈ashdasd'
      }
    ].concat(messages);
    this.setState({messages: newmessages, timestamp: new Date().getTime()});
    console.log(v);
  }
  render() {
    const {messages, timestamp} = this.state;
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
          sendMessage={this.sendMessage2}
          userInfo={{
            userId: '412312123123',
            avatar: 'http://img.binlive.cn/1.png',
            name: '啦啦啦啦'
          }}
        />
        <div className="chat-content">
          <Messages
            timestamp={timestamp}
            loader={<p>loading...</p>}
            scrolltoupper={this.scrolltoupper}
            dataSource={messages}
            loading={this.state.loading}
            userInfo={{
              userId: '412312123123',
              avatar: 'http://img.binlive.cn/1.png',
              name: '啦啦啦啦'
            }}
          />
        </div>
      </div>
    );
  }
}

export default Login;
