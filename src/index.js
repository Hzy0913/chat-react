import React from 'react';
import ChatInput from './chat-input.js';
import Message from './messages.js';

export default class Chat extends React.Component {
  static propTypes = {
    userInfo: PropTypes.object,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    textareaChange: PropTypes.func,
    sendMessage: PropTypes.func,
    selectEmoje: PropTypes.func,
    customEmoticon: PropTypes.array,
    emoji: PropTypes.any
  };
  render() {
    return (
      <div>
        <ChatInput/>
        <Message/>
      </div>
    );
  }
}
