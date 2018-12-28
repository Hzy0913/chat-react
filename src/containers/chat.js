import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import store from 'store';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {Popover} from 'antd-mobile';
import {ChatInput, Messages} from '../components/chat';

import * as authActions from '../redux/reduces/auth';

let pageNum = 1;
const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
@connect(
  state => ({auth: state.auth}),
  dispatch => bindActionCreators(authActions, dispatch)
)
class Chat extends Component {
  static propTypes = {
    auth: PropTypes.object
  };
  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    const {name} = store.get('user') || {};
    const {name: visitorName} = store.get('visitor') || {};
    const userName = name || visitorName;
    if (!userName) {
      return this.props.history.push('/login-chat');
    }
  }
  state = {
    popoverVisible: false,
    messages: [],
    timestamp: new Date().getTime()
  }
  componentWillMount() {
    const {name} = store.get('user') || {};
    const {name: visitorName} = store.get('visitor') || {};
    const {auth: {currentCount, chatList} = {}} = this.props;
    const userName = name || visitorName;
    if (chatList) {
      this.setState({messages: chatList});
    } else if (currentCount && currentCount !== '') {
      this.getChatList(1);
    }
    if ((socket || {}).connected) {
      this.socketConnect(true);
    } else {
      socket.on('connect', this.socketConnect);
    }
    socket.on('disconnect', (reason) => {
      socket.off('connect', this.socketConnect);
    });
  }
  componentDidMount() {
    setTimeout(() => {
      if (this.state.onlineNumber === 1) {
        const overlayNode = <div style={{whiteSpace: 'nowrap'}}>点击小冰的头像,您可以跟我聊天哦</div>;
        this.setState({popoverVisible: true, overlayNode});
        setTimeout(() => {
          this.setState({popoverVisible: false});
        }, 3500);
      }
    }, 6000);
    const {auth: {currentCount, chatList, scrollTop} = {}} = this.props;
    if (chatList && scrollTop) {
      this.refs.message.setScrollTop(scrollTop);
    }
  }
  componentWillUnmount() {
    socket.off('user-join', this.userJoin);
    socket.off('user-info', this.userInfo);
    socket.off('current-count', this.currentCount);
    socket.off('update-message', this.updateMessage);
    socket.off('update-robot-message', this.updateMessage2);
  }
  selectEmoje = (value) => {
    console.log(isMobile);
    !isMobile && this.refs.chatInput.inputFocus();
  }
  textareaChange = (inputValue = '') => {
    this.setState({inputValue});
  }
  getChatList = (page) => {
    const {auth: {currentCount} = {}, saveChatList} = this.props;
    const {messages = [], noData} = this.state;
    if (noData) return;
    if (page) {
      this.setState({loading: true});
    }
    axios.get(`/chat/${page}?currentCount=${currentCount || ''}`).then(res => {
      const {chatList = []} = res;
      if (!chatList.length) {
        this.setState({noData: true});
      }
      const concatMessage = [...chatList, ...messages];
      this.setState({loading: false, messages: concatMessage, timestamp: new Date().getTime()});
      saveChatList(concatMessage);
    });
  }
  robotClick = () => {
    const {inputValue = ''} = this.state;
    this.setState({inputValue: `${inputValue}@Robot小冰 `});
    this.refs.chatInput.inputFocus();
  }
  socketConnect = (connected) => {
    const {name, id} = store.get('user') || {};
    const {name: visitorName, id: visitorId} = store.get('visitor') || {};
    const userName = name || visitorName;
    const userId = id || visitorId;
    const user = {name: userName, id: userId};
    socket.emit('join', user);
    socket.on('user-join', this.userJoin);
    socket.on('user-info', this.userInfo);
    socket.on('current-count', this.currentCount);
    socket.on('update-message', this.updateMessage);
    socket.on('update-robot-message', this.updateMessage2);
  }
  currentCount = ({messageCount: count} = {}) => {
    const {auth: {currentCount} = {}, saveCurrentCount} = this.props;
    if (currentCount) return;
    saveCurrentCount(count);
    this.getChatList(1);
  }
  userInfo = (msg = {}) => {
    const {onlineNumber} = msg;
    // if (onlineNumber === 1) {
    //   const {messages} = this.state;
    //   setTimeout(() => {
    //     const robotTip = {
    //       userInfo: {
    //         avatar: 'http://img.binlive.cn/robot.png',
    //         name: 'Robot小冰',
    //         userId: 'RobotId'
    //       },
    //       value: '现在只有你一个人和小冰在呢,快点击小冰头像跟我聊天吧',
    //       timestamp: new Date().getTime()
    //     };
    //     messages.push(robotTip);
    //     this.setState({messages, timestamp: new Date().getTime()});
    //   }, 2500);
    // }
    this.setState({onlineNumber});
  }
  userJoin = (msg = {}) => {
    const {type, onlineNumber, name: joinName} = msg;
    if (type === 'disconnect') {
      return this.setState({onlineNumber});
    }
    const overlayNode = <div style={{whiteSpace: 'nowrap'}}>{joinName} 已进入</div>;
    this.setState({popoverVisible: true, joinUser: msg, onlineNumber, overlayNode});
    setTimeout(() => {
      this.setState({popoverVisible: false});
    }, 3500);
  }
  updateMessage = (msg) => {
    const {messages} = this.state;
    messages.push(msg);
    this.setState({messages, timestamp: new Date().getTime()});
  }
  onScroll = (v) => {
    const {saveScrollTop} = this.props;
    saveScrollTop(v);
  }
  scrolltoupper = (v) => {
    pageNum += 1;
    this.getChatList(pageNum);
  }
  avatarClick = ({name, userId}) => {
    const {id} = store.get('user') || store.get('visitor') || {};
    if (userId.toString() === id.toString()) return;
    const {inputValue = ''} = this.state;
    this.setState({inputValue: `${inputValue}@${name} `});
    this.refs.chatInput.inputFocus();
  }
  sendMessage = (v) => {
    const {value} = v;
    if (!value) return;
    const {messages} = this.state;
    messages.push(v);
    this.setState({messages, timestamp: new Date().getTime(), inputValue: ''});
    if (value.includes('@Robot小冰')) {
      v.type = 'robot';
    }
    socket.emit('send-message', v);
  }
  render() {
    const {
      inputValue, messages, timestamp, popoverVisible, joinUser = {}, onlineNumber = 1, noData,
      overlayNode
    } = this.state;
    const user = store.get('user') || store.get('visitor') || {};
    if (!user.id) {
      return null;
    }
    const userInfo = {...user, userId: user.id};
    const {name: joinName} = joinUser;
    return (
      <div className="chat-box">
        <div className="chat-top-bar">
          <div className="robot-placeholder" onClick={this.robotClick} />
          <Popover
            visible={popoverVisible}
            placement="bottomLeft"
            className="chat-popover"
            onVisibleChange={this.onVisibleChange}
            overlay={overlayNode}
            getTooltipContainer={() => document.querySelector('.robot')}
          >
            <div className="robot" />
          </Popover>
          <div className="online-num">
            <span>在线人数</span>
            <i className="iconfont icon-me_surface" />
            <span>{onlineNumber}</span>
          </div>
        </div>
        <ChatInput
          sendMessage={this.sendMessage}
          userInfo={userInfo}
          placeholder="请输入内容..."
          value={inputValue}
          selectEmoje={this.selectEmoje}
          textareaChange={this.textareaChange}
          ref="chatInput"
        />
        <Messages
          style={{height: '100%', width: '100%', position: 'fixed', padding: '46px 0px 52px 0px'}}
          timestamp={timestamp}
          scrolltoupper={this.scrolltoupper}
          avatarClick={this.avatarClick}
          dataSource={messages}
          loading={this.state.loading}
          userInfo={userInfo}
          noData={noData}
          onScroll={this.onScroll}
          timeagoMax={24}
          ref="message"
        />
      </div>
    );
  }
}

export default withRouter(Chat);
