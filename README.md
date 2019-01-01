#### ChatInput component
| prop & func  | type  | description   |
| ------------ | ------------ | ------------ |
| userInfo  | object  | userinfo of sent the message  |
|  value | string  | the message of input content     |
|  placeholder | string  |  placeholders for input box      |
|  emoji | any  |   define content of the emoji     |
|  customEmoticon | array  |  customized emoticon      |
|  textareaChange | (value) => {}  |   callback function when the content of input box changes. the first function parameter is current input value      |
|  selectEmoje | (emojeInfo) => {}   |   callback function after select a emoje. the first function parameter is selected emoje info          |
|  inputFocus | func  |  method of component, set input focus        |
##### param description of ChatInput component
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
 - `inputFocus` set input box focus

#### Messages component
| prop & func  | type  | description   |
| ------------ | ------------ | ------------ |
| userInfo  | object  | userinfo of the message lists (It's the same as userInfo param of ChatInput component) |
|  dataSource | array  |  data content of message list      |
|  timestamp | number  |    timestamp to be set when dataSource changes     |
|  timeBetween | number  |   how many time between show time prompts (unit: min, default: 5)    |
|  timeagoMax | number  |   time range of the show timeago  (unit: hour, default: 24)    |
|   timeFormat  | string  |  custom format time (yyyy-MM-dd hh:mm)    |
|  loading | bool  |  is the dataSource loading   |
|  loader | node  |  custom loader      |
|  noData | bool  |  whether has no more data      |
|  noDataEle | node  |  custom dom node displayed when there is no more data      |
|  scrolltoupper | func  |   callback function when the  scroll bar of message list to the top     |
|  onScroll | func  |   callback function when the  scroll bar change    |
|  avatarClick | func  |   callback function user to click the avatar     |
|  unreadCountChange | func  |   callback function when the unread message has change     |
|  setScrollTop | func  |  method of component, set scroll bar position        |
##### param description of Messages component
 - `userInfo`  the usage of this parameter is consistent with that of ChatInput component.
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
    value: "😀"
}]
```
 - `timestamp`

