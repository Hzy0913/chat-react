import React from 'react';
import ChatInput from './chat-input.js';
import Message from './messages.js';

export default class Chat extends React.Component {
  render() {
    return (
      <div>
        <ChatInput/>
        <Message/>
      </div>
    );
  }
}
