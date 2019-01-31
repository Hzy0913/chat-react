## Chat-React
##### chat component for react.  [中文文档](https://github.com/Hzy0913/chat-react/blob/master/README_zh.md "中文文档")
![chat-react](https://raw.githubusercontent.com/Hzy0913/hanlibrary/master/chat-react-350.png "chat-react")
#### Demonstration
![chat-react](https://raw.githubusercontent.com/Hzy0913/hanlibrary/master/chat-react.gif "chat-react")
### Usage

 - Install

```bash
npm install chat-react
```
 - Import

```js
import Chat from 'chat-react';
```

 - usage

```js
export default class MyChat extends Component {
  state = {
    inputValue: '',
    messages: [],
    timestamp: new Date().getTime()
  }
  setInputfoucs = () => {
    this.chat.refs.input.inputFocus();  //set input foucus
  }
  setScrollTop = () => {
    this.chat.refs.message.setScrollTop(1200);  //set scrollTop position
  }
  sendMessage = (v) => {
    const {value} = v;
    if (!value) return;
    const {messages = []} = this.state;
    messages.push(v);
    this.setState({messages, timestamp: new Date().getTime(), inputValue: ''});
  }
  render() {
    const {inputValue, messages, timestamp} = this.state;
    const userInfo = {
      avatar: "http://img.binlive.cn/6.png",
      userId: "59e454ea53107d66ceb0a598",
      name: 'ricky'
    };
    return (
      <Chat
        ref={el => this.chat = el}
        className="my-chat-box"
        dataSource={messages}
        userInfo={userInfo}
        value={inputValue}
        sendMessage={this.sendMessage}
        timestamp={timestamp}
        placeholder="write some thing..."
        messageListStyle={{width: '100%', height: window.outerHeight}}
      />
    );
  }
}
```
#### API
| prop & func  | type  | description   |
| ------------ | ------------ | ------------ |
| userInfo  | object  | info of current user  |
|  value | string  | the message of input content     |
|  placeholder | string  |  placeholder for input box      |
|  emoji | any  |   define content of the emoji     |
|  customEmoticon | array  |  customized emoticon      |
|  textareaChange | (value) => {}  |   callback function when the content of input box changes. the first function parameter is current input value      |
|  selectEmoje | (emojeInfo) => {}   |   callback function after select a emoje. the first function parameter is selected emoje info          |
|  inputFocus | func  |  method of input child component, set input focus. `this.chat.refs.input.inputFocus()`          |
|  dataSource | array  |  data content of message list      |
|  messageListStyle | object  | message list container style，you need to set a fixed size  height for it.     |
|  timestamp | number  |    timestamp to be set when dataSource changes     |
|  timeBetween | number  |   how many time between show time prompts (unit: min, default: 5)    |
|  timeagoMax | number  |   time range of the show timeago  (unit: hour, default: 24)    |
|   timeFormat  | string  |  custom format time (yyyy-MM-dd hh:mm)    |
|  loading | bool  |  is the dataSource loading   |
|  loader | node  |  custom loader      |
|  noData | bool  |  whether has no more data      |
|  scrollOptions | object  |   this param used iscroll.js's scrollbars parameter, [view iscroll.js Doc.](https://github.com/cubiq/iscroll#scrollbars "Doc")      |
|  noDataEle | node  |  custom dom node displayed when there is no more data      |
|  scrolltoUpper | func  |   callback function when the  scroll bar of message list to the top     |
|  onScroll | func  |   callback function when the  scroll bar change    |
|  avatarClick | func  |   callback function user to click the avatar     |
|  unreadCountChange | func  |   callback function when the unread message has change     |
|  setScrollTop | func  |  method of message child component, set scroll bar position.  `this.chat.refs.message.setScrollTop(1200)`        |
##### the param description of component
 - `userInfo` you must to be define **userId** and **avatar** for this param, and you can also add some attributes if you need.
 ```javascript
userInfo = {
  avatar: 'http://example/avatar.jpg', //user avatar,  required parameters
  userId: '5bf7cf25a069a537ffe7c324', //user id,  required parameters
  name: 'rigcky',
  other: 'otherInfo'
}
```
 - `emoji ` if emoji param is **false**,  not show emoji. if  you want to add more emoji,you can set this param is array content.
```javascript
// add more emoji
emoji = [
  {text: 'panda', content: '🐼'},
  {text: 'tiger', content: '🐯'},
  {text: 'pig', content: '🐷'}
]
```
 - `customEmoticon` customized emoticon,it is array type of this param.
 ```javascript
customEmoticon = [
  {text: 'smile', url: 'http://example/emoticon.png'},
  {text: 'angry', url: 'http://example/emoticon2.png'},
  {text: 'weep', url: 'data:image/png;base64,iVBORw0KGgoA...'}
]
```
 - `dataSource`  data source of message list, the data format is as follows:
```javascript
const customEmoticon = [{
    timestamp: 1545925494422,
    userInfo: {
        avatar: "http://example/2.png",
        name: "游客1544365758856",
        userId: "1544365758856"
    },
    value: "hello~"
},  {
    timestamp: 1545925534218,
    userInfo: {
        avatar: "http://example/2.png",
        name: "游客1544365758856",
        userId: "1544365758856"
    },
    value: "😀",
    error: true //set error is true，this message will be show error icon
}]
```
 - `messageListStyle` message list container style，you need to set a fixed size height for it,make sure it's not pushed up ， for example `{width: '100%', height: 500}`
 - `timestamp`  this parameter needs to be set to the current timestamp when the data of **dataSource** param has changes.
 - `timeFormat` formatting times, such as display 2019-2-1 20:20 set to yyyy-MM-dd hh:mm.
