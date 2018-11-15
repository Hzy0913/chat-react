import React, {Component} from 'react';
// RCE CSS
import 'react-chat-elements/dist/main.css';
// MessageBox component
import {
  MessageBox,
  SystemMessage,
  MessageList,
  ChatList,
  Input,
  Button,
  Popup
} from 'react-chat-elements';

class Icon extends Component {
  state = {
    show: true
  };

  render() {
    const {current} = this.state;
    return (
      <div>
        <i className="iconfont icon-shoucang" />
        <p>字体图标</p>
        <MessageBox
          position="left"
          type="photo"
          text="react.svg"
          data={{
            uri: 'http://img.binlive.cn/upload/1525010252092',
            status: {
              click: false,
              loading: 0,
            }
          }}
        />
        <SystemMessage text="End of conversation" />
        <MessageList
          className="message-list"
          lockable
          toBottomHeight="100%"
          dataSource={[{
            position: 'right',
            type: 'text',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
            date: new Date(),
          }]}
        />
        <ChatList
          className="chat-list"
          dataSource={[{
            avatar: 'http://img.binlive.cn/upload/1525010252092',
            alt: 'Reactjs',
            title: 'Facebook',
            subtitle: 'What are you doing?',
            date: new Date(),
            unread: 0,
          }]}
        />
        <h1>1</h1>
        <Input
          placeholder="Type here..."
          multiline
          rightButtons={
            <Button
              color="white"
              backgroundColor="black"
              text="Send"
            />
          }
        />
        <Popup
          show={this.state.show}
          header="Lorem ipsum dolor sit amet."
          headerButtons={[{
            type: 'transparent',
            color: 'black',
            text: 'close',
            onClick: () => {
              this.setState({show: false});
            }
          }]}
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
           Voluptatem animi veniam voluptas eius!"
          footerButtons={[{
            color: 'white',
            backgroundColor: '#ff5e3e',
            text: 'Vazgeç',
          }, {
            color: 'white',
            backgroundColor: 'lightgreen',
            text: 'Tamam',
          }]}
        />
      </div>
    );
  }
}


export default Icon;
