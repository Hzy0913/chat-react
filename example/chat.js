import React, {Component} from 'react';
import ChatReact from '../src';
// import ChatReact from '../lib/chat-react';
// import {emojis} from '../components/chat/icon';

export default class Chat extends Component {
  state = {
    messages: [],
    timestamp: new Date().getTime()
  }
  foucss = () => {
    this.chat.refs.message.setScrollTop(1200);
  }
  scrolltoUpper = (v) => {
    console.log(v);
  }
  onScroll = (v) => {
    console.log(v);
  }
  sendMessage = (v) => {
    const {value} = v;
    if (!value) return;
    const {messages = []} = this.state;
    messages.push(v);
    this.setState({messages, timestamp: new Date().getTime(), inputValue: ''});
  }
  render() {
    const {inputValue = '', messages, timestamp} = this.state;
    const {className = ''} = this.props;
    const userInfo = {
      avatar: "http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg",
      userId: "59e454ea53107d66ceb0a598"
    };
    console.log(document.body.clientHeight);
    console.log(document.documentElement.clientHeight);
    return (
      <div className={`chat-box ${className}`}>
        <div onClick={this.foucss}>123123123</div>
        <ChatReact
          dataSource={messages}
          userInfo={userInfo}
          value={inputValue}
          sendMessage={this.sendMessage}
          timestamp={timestamp}
          placeholder="请输入"
          messageListStyle={{width: '100%', height: window.outerHeight}}
          // customEmoticon={false}
          //not must
          textareaChange={this.textareaChange}
          ref={el => this.chat = el}
          timeBetween={0}
          timeagoMax={0}
          timeFormat="yyyy-MM-dd hh:mm"
          // loading
          // noData
          // noDataEle={<div>无数据</div>}
          scrolltoUpper={this.scrolltoUpper}
          avatarClick={this.onScroll}
        />
      </div>
    );
  }
}



