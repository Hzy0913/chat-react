import React, {Component} from 'react';
// import ChatReact from '../dist/main';
import ChatReact from '../src';

// const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);

export default class Chat extends Component {
  // state = {
  //   popoverVisible: false,
  //   messages: [],
  //   timestamp: new Date().getTime()
  // }
  // componentWillMount() {
  // //
  // }
  // componentDidMount() {
  // }
  // componentWillUnmount() {
  // //
  // }
  // selectEmoje = (value) => {
  //   !isMobile && this.chatInput.inputFocus();
  // }
  // textareaChange = (inputValue = '') => {
  //   this.setState({inputValue});
  // }
  // getChatList = (page) => {
  //   const {auth: {currentCount} = {}, saveChatList} = this.props;
  //   const {messages = [], noData} = this.state;
  //   if (noData) return;
  //   if (page) {
  //     this.setState({loading: true});
  //   }
  //   axios.get(`/chat/${page}?currentCount=${currentCount || ''}`).then(res => {
  //     const {chatList = []} = res;
  //     if (!chatList.length) {
  //       this.setState({noData: true});
  //     }
  //     const concatMessage = [...chatList, ...messages];
  //     this.setState({loading: false, messages: concatMessage, timestamp: new Date().getTime()});
  //     saveChatList(concatMessage);
  //   });
  // }
  // robotClick = () => {
  //   const {inputValue = ''} = this.state;
  //   this.setState({inputValue: `${inputValue}@Robot小冰 `});
  // }
  // socketConnect = (connected) => {
  //   const userName = name || visitorName;
  //   const userId = id || visitorId;
  //   const user = {name: userName, id: userId};
  //   socket.emit('join', user);
  //   socket.on('user-join', this.userJoin);
  //   socket.on('user-info', this.userInfo);
  //   socket.on('current-count', this.currentCount);
  //   socket.on('update-message', this.updateMessage);
  //   socket.on('update-robot-message', this.updateMessage2);
  // }
  // currentCount = ({messageCount: count} = {}) => {
  //   const {auth: {currentCount} = {}, saveCurrentCount} = this.props;
  //   if (currentCount) return;
  //   saveCurrentCount(count);
  //   this.getChatList(1);
  // }
  // userInfo = (msg = {}) => {
  //   const {onlineNumber} = msg;
  //   // if (onlineNumber === 1) {
  //   //   const {messages} = this.state;
  //   //   setTimeout(() => {
  //   //     const robotTip = {
  //   //       userInfo: {
  //   //         avatar: 'http://img.binlive.cn/robot.png',
  //   //         name: 'Robot小冰',
  //   //         userId: 'RobotId'
  //   //       },
  //   //       value: '现在只有你一个人和小冰在呢,快点击小冰头像跟我聊天吧',
  //   //       timestamp: new Date().getTime()
  //   //     };
  //   //     messages.push(robotTip);
  //   //     this.setState({messages, timestamp: new Date().getTime()});
  //   //   }, 2500);
  //   // }
  //   this.setState({onlineNumber});
  // }
  // userJoin = (msg = {}) => {
  //   const {type, onlineNumber, name: joinName} = msg;
  //   if (type === 'disconnect') {
  //     return this.setState({onlineNumber});
  //   }
  //   const overlayNode = <div style={{whiteSpace: 'nowrap'}}>{joinName} 已进入</div>;
  //   this.setState({popoverVisible: true, joinUser: msg, onlineNumber, overlayNode});
  //   setTimeout(() => {
  //     this.setState({popoverVisible: false});
  //   }, 3500);
  // }
  // updateMessage = (msg) => {
  //   const {messages} = this.state;
  //   messages.push(msg);
  //   this.setState({messages, timestamp: new Date().getTime()});
  // }
  // onScroll = (v) => {
  //   const {saveScrollTop} = this.props;
  //   saveScrollTop(v);
  // }
  // scrolltoupper = (v) => {
  //   pageNum += 1;
  //   this.getChatList(pageNum);
  // }
  // avatarClick = ({name, userId}) => {
  //   if (userId.toString() === id.toString()) return;
  //   const {inputValue = ''} = this.state;
  //   this.setState({inputValue: `${inputValue}@${name} `});
  // }
  // sendMessage = (v) => {
  //   const {value} = v;
  //   if (!value) return;
  //   const {messages} = this.state;
  //   messages.push(v);
  //   this.setState({messages, timestamp: new Date().getTime(), inputValue: ''});
  // }
  render() {
    // const {
    //   inputValue, messages, timestamp, popoverVisible, joinUser = {}, onlineNumber = 1, noData,
    //   overlayNode
    // } = this.state;
    const userInfo = {
      avatar: "http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg",
      userId: "59e454ea53107d66ceb0a598"
    };
    // const {name: joinName} = joinUser;
    return (
      <div className="chat-box">
        <ChatReact userInfo={userInfo}/>
      </div>
    );
  }
}



