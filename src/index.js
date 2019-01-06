import React from 'react';
import ChatInput from './chat-input.js';
import Message from './messages.js';

export default class Chat extends React.Component {
  render() {
    const {userInfo, value, placeholder, emoji, customEmoticon, textareaChange, selectEmoje,
      inputFocus, dataSource, timestamp, timeBetween, timeagoMax, timeFormat, loading, loader,
      noData, noDataEle, scrolltoupper, onScroll, avatarClick, unreadCountChange
    } = this.props;
    const inputProps = {
      userInfo,
      value,
      placeholder,
      emoji,
      customEmoticon,
      textareaChange,
      selectEmoje,
      inputFocus
    };
    const messageProps = {
      userInfo,
      dataSource,
      emoji,
      customEmoticon,
      timestamp,
      timestamp,
      timeagoMax,
      timeFormat,
      loading,
      loader,
      noData,
      noDataEle,
      scrolltoupper,
      onScroll,
      avatarClick,
      unreadCountChange
    };
    return (
      <div>
        <ChatInput {...inputProps} />
        <Message {...messageProps} />
      </div>
    );
  }
}
