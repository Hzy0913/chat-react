import React from 'react';
import ChatInput from './chat-input.js';
import Message from './messages.js';

export default class Chat extends React.Component {
  render() {
    const {className = '', style = {}, userInfo, value, placeholder, emoji, customEmoticon, textareaChange, selectEmoje, sendMessage,
      inputFocus, dataSource, timestamp, timeBetween, timeagoMax, timeFormat, loading, loader, messageListStyle,
      noData, noDataEle, scrolltoUpper, onScroll, avatarClick, unreadCountChange, scrollOptions
    } = this.props;
    const inputProps = {
      userInfo,
      value,
      placeholder,
      emoji,
      customEmoticon,
      textareaChange,
      selectEmoje,
      inputFocus,
      sendMessage,
      ref: 'input'
    };
    const messageProps = {
      userInfo,
      dataSource,
      emoji,
      customEmoticon,
      messageListStyle,
      timestamp,
      timeBetween,
      timeagoMax,
      timeFormat,
      loading,
      loader,
      noData,
      noDataEle,
      scrolltoUpper,
      onScroll,
      avatarClick,
      unreadCountChange,
      scrollOptions,
      ref: 'message'
    };
    return (
      <div className={className} style={style}>
        <ChatInput {...inputProps} />
        <Message {...messageProps} />
      </div>
    );
  }
}
