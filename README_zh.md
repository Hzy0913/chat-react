![chat-react](https://raw.githubusercontent.com/Hzy0913/hanlibrary/master/chat-react.gif "chat-react")
#### 使用方法
 - 安装

```bash
npm install chat-react
```
 - 引入

```js
import { ChatInput, Messages} from 'chat-react';
```
 - 使用

```js
import { ChatInput, Messages} from 'chat-react';
```
#### ChatInput 组件
| 属性 & 方法  | 类型  | 描述   |
| ------------ | ------------ | ------------ |
| userInfo  | object  | 发送消息的用户信息  |
|  value | string  | 输入框的内容     |
|  placeholder | string  |  输入框的占位符      |
|  emoji | any  |   定义emoji内容    |
|  customEmoticon | array  | 自定义表情包     |
|  textareaChange | (value) => {}  |  回调函数,输入框的内容变化时触发，函数的第一个参数是当前输入值  |
|  selectEmoje | (emojeInfo) => {}   |   选择一个emoji后的回调函数，函数的第一个参数是选择的emoje内容信息   |
|  inputFocus | func  |  组件的内置方法，用于设置input焦点       |

##### ChatInput 组件的参数描述
 - `userInfo` 你必须为这个参数定义**userId**和 **avatar**属性,也可以添加一些你需要属性。
 ```javascript
userInfo = {
  avatar: 'http://example/avatar.jpg', //user avatar,  required parameters
  userId: '5bf7cf25a069a537ffe7c324', //user id,  required parameters
  name: 'rigcky',
  other: 'otherInfo'
}
```
 - `emoji ` 如果设置emoji参数为**false**,则不显示emoji。如果你想添加更多的emoji,您可以设置这个参数是数组的内容。
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
 - `inputFocus` 设置输入框为焦点状态

#### Messages 组件
| 属性 & 方法  | 类型  | 描述   |
| ------------ | ------------ | ------------ |
| userInfo  | object  | 消息组件的用户信息 (与ChatInput组件的**userInfo**参数一致) |
|  dataSource | array  |  消息列表的数据内容     |
|  timestamp | number  |   数据源发生变化时候设置的时间戳   |
|  timeBetween | number  |   在指定时间间隔内显示时间提示(单位:分钟,默认值:5)    |
|  timeagoMax | number  |   在指定时间范围内显示多长时间之前(单位:小时,默认值:24) |
|   timeFormat  | string  |  自定义时间格式 (yyyy-MM-dd hh:mm)    |
|  loading | bool  |  数据源是否在加载中   |
|  loader | node  |  自定义加载器     |
|  noData | bool  |  是否没有更多的数据了   |
|  noDataEle | node  |  当没有更多的数据时显示自定义的元素节点      |
|  scrolltoupper | func  |  滚动条滚动到顶部时触发的回调函数  |
|  onScroll | func  |   当滚动条滚动时触发的回调函数    |
|  avatarClick | func  |  用户点击头像触发的回调函数     |
|  unreadCountChange | func  |  未读消息变化时的回调函数   |
|  setScrollTop | setScrollTop(value)  | 组件的内置方法，用于设置滚动条位置   |
##### Messages 组件的参数描述
 - `userInfo`  该参数使用方法与ChatInput组件的**userInfo**一致
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
 - `timestamp` 当前**dataSource**的数据发生变化时候需要设置该参数为当前的时间戳
 - `timeFormat` 格式化时间参数，例如显示2019-2-1 20: 20设置为yyyy-MM-dd hh:mm
