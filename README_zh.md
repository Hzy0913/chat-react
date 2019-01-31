## Chat-React
##### 基于react的聊天会话组件
![chat-react](https://raw.githubusercontent.com/Hzy0913/hanlibrary/master/chat-react-350.png "chat-react")
#### 演示
![chat-react](https://raw.githubusercontent.com/Hzy0913/hanlibrary/master/chat-react.gif "chat-react")
#### 使用方法
 - 安装

```bash
npm install chat-react
```
 - 引入

```js
import Chat from 'chat-react';
```
 - 使用

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
        placeholder="请输入"
        messageListStyle={{width: '100%', height: window.outerHeight}}
      />
    );
  }
}
```

#### API
| 属性 & 方法  | 类型  | 描述   |
| ------------ | ------------ | ------------ |
| userInfo  | object  | 当前用户信息  |
|  value | string  | 输入框的内容     |
|  placeholder | string  |  输入框的占位符      |
|  emoji | any  |   定义emoji内容    |
|  customEmoticon | array  | 自定义表情包     |
|  textareaChange | (value) => {}  |  回调函数,输入框的内容变化时触发，函数的第一个参数是当前输入值  |
|  selectEmoje | (emojeInfo) => {}   |   选择一个emoji后的回调函数，函数的第一个参数是选择的emoje内容信息   |
|  inputFocus | func  |  子组件input的内置方法，用于设置input焦点  `this.chat.refs.input.inputFocus()`       |
|  dataSource | array  |  消息列表的数据内容     |
|  messageListStyle | object  |  消息列表的样式，需要为列表设置一个固定的高度     |
|  timestamp | number  |   数据源发生变化时候设置的时间戳   |
|  timeBetween | number  |   在指定时间间隔内显示时间提示(单位:分钟,默认值:5)    |
|  timeagoMax | number  |   在指定时间范围内显示多长时间之前(单位:小时,默认值:24) |
|   timeFormat  | string  |  自定义时间格式 (yyyy-MM-dd hh:mm)    |
|  loading | bool  |  数据源是否在加载中   |
|  loader | node  |  自定义加载器     |
|  noData | bool  |  是否没有更多的数据了   |
|  noDataEle | node  |  当没有更多的数据时显示自定义的元素节点      |
|  scrollOptions | object  |   该参数使用了iscroll.js的 scrollbars 参数, [查看 iscroll.js 文档](https://github.com/cubiq/iscroll#scrollbars "Doc")      |
|  scrolltoUpper | func  |  滚动条滚动到顶部时触发的回调函数  |
|  onScroll | func  |   当滚动条滚动时触发的回调函数    |
|  avatarClick | (value) => {}  |  用户点击头像触发的回调函数, 参数value为被点击用户信息     |
|  unreadCountChange | func  |  未读消息变化时的回调函数   |
|  setScrollTop | setScrollTop(value)  | 子组件message的内置方法，用于设置滚动条位置   `this.chat.refs.message.setScrollTop(1200)`|
#####  组件参数描述
 - `userInfo` 你必须为这个参数定义**userId**和 **avatar**属性,也可以添加一些你需要属性。
 ```javascript
userInfo = {
  avatar: 'http://example/avatar.jpg', //user avatar,  required parameters
  userId: '5bf7cf25a069a537ffe7c324', //user id,  required parameters
  name: 'rigcky',
  other: 'otherInfo'
}
```
 - `emoji ` 如果设置emoji参数为**false**,则不显示emoji。如果你想添加更多的emoji,您可以设置这个参数为数组，内容为你所添加的emoji。
```javascript
// add more emoji
emoji = [
  {text: 'panda', content: '🐼'},
  {text: 'tiger', content: '🐯'},
  {text: 'pig', content: '🐷'}
]
```
 - `customEmoticon` 自定义的表情包,参数为数组类型
 ```javascript
customEmoticon = [
  {text: 'smile', url: 'http://example/emoticon.png'},
  {text: 'angry', url: 'http://example/emoticon2.png'},
  {text: 'weep', url: 'data:image/png;base64,iVBORw0KGgoA...'}
]
```
 - `dataSource` 消息列表的数据源,数据格式如下:
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
    error: true //设置消息状态为失败，显示错误状态图标
}]
```
 - `messageListStyle` 消息列表的容器样式，你必须为其设置一个固定的高度，保证其不会被内容撑开，例如`{width: '100%', height: 500}`
 - `timestamp` 当前**dataSource**的数据发生变化时候必须重新设置该参数为当前的时间戳
 - `timeFormat` 格式化时间参数，例如显示2019-2-1 20: 20设置为yyyy-MM-dd hh:mm
