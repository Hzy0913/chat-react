import React, {Component} from 'react';
import ChatReact from '../src';
import VConsole from 'vconsole';
// import ChatReact from '../lib/chat-react';
// import {emojis} from '../components/chat/icon';
// const vConsole = new VConsole();

export default class Chat extends Component {
  state = {
    messages: [],
    timestamp: new Date().getTime()
  }
  componentDidMount() {
    const messages = [{"value": "123","timestamp":1548756977198,"userInfo":{"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea53107d66ceb0a598"}},{"value":"1\n","timestamp":1548756979285,"userInfo":{"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea53107d66ceb0a598"}},{"value":"1\n1","timestamp":1548756979622,"userInfo":{"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea53107d66ceb0a598"}},{"value":"\n","timestamp":1548756979901,"userInfo":{"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea53107d66ceb0a598"}},{"value":"1\n","timestamp":1548756980189,"userInfo":{"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea53107d66ceb0a598"}},{"value":"1\n","timestamp":1548756980509,"userInfo":{"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea53107d66ceb0a598"}},{"value":"1\n","timestamp":1548756980789,"userInfo":{"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea53107d66ceb0a598"}},{"value":"1\n1","timestamp":1548756981093,"userInfo":{"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea53107d66ceb0a598"}},{"value":"\n1","timestamp":1548756981397,"userInfo":{"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea53107d66ceb0a598"}},{"value":"\n1","timestamp":1548756981684,"userInfo":{"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea53107d66ceb0a598"}},{"value":"\n1","timestamp":1548756981949,"userInfo":{"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea53107d66ceb0a598"}},{"value":"\n1","timestamp":1548756982206,"userInfo":{"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea53107d66ceb0a598"}},{"value":"\n","timestamp":1548756982478,"userInfo":{"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea53107d66ceb0a598"}},{"value":"1\n","timestamp":1548756982750,"userInfo":{"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea53107d66ceb0a598"}},{"value":"1\n","timestamp":1548756983046,"userInfo":{"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea53107d66ceb0a598"}},{"value":"1\n","timestamp":1548756983430,"userInfo":{"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea53107d66ceb0a598"}}]

    setTimeout(() => {
      this.setState({messages, timestamp: new Date().getTime()});
    }, 800)
  }
  foucss = () => {
    const {messages} = this.state;
    messages.push({"value": "123","timestamp": new Date().getTime(),"userInfo":{"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea52107d66ceb0a598"}});
    this.setState({messages, timestamp: new Date().getTime()});
    // this.chat.refs.message.setScrollTop(600);
  }
  scrolltoUpper = (v) => {
    this.setState({loading: true});

    const {messages} = this.state;
    messages.unshift({
      "value": "vvvvvvv",
      "timestamp": 1448156977198,
      "userInfo": {"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg", "userId":"59e454ea52107d66ceb0a598"}
    });
    messages.unshift({
      "value": "vvvvvvv2222",
      "timestamp": 1448156977298,
      "userInfo": {"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea52107d66ceb0a598"}
    });
    messages.unshift({
      "value": "vvvvvvv2222",
      "timestamp": 1448156977398,
      "userInfo": {"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea52107d66ceb0a598"}
    });
    messages.unshift({
      "value": "vvvvvvv2222",
      "timestamp": 1448156977498,
      "userInfo": {"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea52107d66ceb0a598"}
    });
    messages.unshift({
      "value": "vvvvvvv2222",
      "timestamp": 1448156977598,
      "userInfo": {"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea52107d66ceb0a598"}
    });
    messages.unshift({
      "value": "vvvvvvv2222",
      "timestamp": 1448156977698,
      "userInfo": {"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea52107d66ceb0a598"}
    });
    messages.unshift({
      "value": "vvvvvvv2222",
      "timestamp": 1448156977898,
      "userInfo": {"avatar":"http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg","userId":"59e454ea52107d66ceb0a598"}
    });
    setTimeout(() => {
      this.setState({messages, timestamp: new Date().getTime(), loading: false});
    }, 1222)
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
    const {inputValue = '', messages, timestamp, loading} = this.state;
    const {className = ''} = this.props;
    const userInfo = {
      avatar: "http://img.binlive.cn/Fv0UOcmxAB7k_4JSWMzJLkgpZfUg",
      userId: "59e454ea53107d66ceb0a598"
    };
    return (
      <div className={`chat-box ${className}`}>
        <div onClick={this.foucss}>2121</div>
        <ChatReact
          dataSource={messages}
          userInfo={userInfo}
          value={inputValue}
          sendMessage={this.sendMessage}
          timestamp={timestamp}
          placeholder="请输入"
          messageListStyle={{width: '100%', height: 400, overflow: 'hidden'}}
          // customEmoticon={false}
          //not must
          textareaChange={this.textareaChange}
          ref={el => this.chat = el}
          timeBetween={0}
          timeagoMax={0}
          timeFormat="yyyy-MM-dd hh:mm"
          loading={loading}
          // noData
          // noDataEle={<div>无数据</div>}
          scrolltoUpper={this.scrolltoUpper}
          onScroll={this.onScroll}
          scrollOptions={{fadeScrollbars: true}}
          // unreadCountChange={this.onScroll}
        />
      </div>
    );
  }
}



