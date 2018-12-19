import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {emojiIcon, submitIcon, emojis} from './icon';
import {emojiDefault} from './emoji';
import Popup from '../popup';
import './style.css';

export default class ChatInput extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    loading: PropTypes.bool,
    scrolltoupper: PropTypes.func,
    timestamp: PropTypes.number,
    loader: PropTypes.node,
    customEmoticon: PropTypes.array,
  };
  state = {
    visible: false,
    textarea: ''
  }
  componentDidMount() {
    document.addEventListener('click', this.hidePopup, true);
  }
  hidePopup = (e) => {
    const {target: {className, id}} = e;
    if (className === 'emoji-icon-img' || id === 'emoji-picker-content-warpper') return;
    this.setState({visible: false});
  }
  visiblePopup = (e) => {
    e.stopPropagation();
    const {visible} = this.state;
    this.setState({visible: !visible});
  }
  selectEmoje = ({text}, isEmoji) => {
    const {textarea} = this.state;
    const {emoji = []} = this.props;
    const emojiContent = [...emojiDefault, ...emoji];
    if (isEmoji) {
      const {content} = emojiContent.find(item => item.text === text) || {};
      return this.setState({visible: true, textarea: `${textarea}${content}`});
    }
    this.setState({visible: true, textarea: `${textarea}[${text}]`});
  }
  submit = (e) => {
    const {userInfo, sendMessage} = this.props;
    const {textarea} = this.state;
    const data = {
      value: textarea,
      timestamp: new Date().getTime(),
      userInfo
    };
    this.setState({textarea: ''});
    sendMessage && sendMessage(data);
  }
  textareaChange = (e) => {
    const {textareaChange} = this.props;
    this.setState({textarea: e.target.value});
    if (textareaChange) {
      textareaChange(e.target.value);
    }
  }
  render() {
    const {visible, textarea} = this.state;
    const {
      placeholder, customEmoticon = [], emoji, value
    } = this.props;
    const showEmoji = emoji !== false;
    const emojiContent = Array.isArray(emoji) ? [...emojiDefault, ...emoji] : emojiDefault;
    const inputValue = value || textarea;
    return (
      <div className="chat-input-wrapper">
        <div className="emoji-box">
          <div
            id="emoji-picker-content-warpper"
            onClick={(e) => e.preventDefault()}
            className={`emoji-picker ${visible ? 'emoji-popup-animate-show' :
              'popup-animate-hide'}`}
          >
            <div className="emoji-picker-content">
              {customEmoticon.map(v =>
                (<div
                  key={v.text}
                  className="emoji-item"
                  onClick={(e) => { this.selectEmoje(v); }}
                ><img src={v.url} /></div>))}
              {showEmoji && emojiContent.map(v =>
                (<div
                  key={v.text}
                  className="emoji-item"
                  onClick={(e) => { this.selectEmoje(v, true); }}
                >{v.content}</div>))}
            </div>
            <div className="emoji-picker-arrow" />
          </div>
          <div className="emoji-icon" onClick={this.visiblePopup}>
            <img src={emojiIcon} className="emoji-icon-img" />
          </div>
        </div>
        <div className="chat-textarea-box" style={{height: !textarea ? 32 : 'auto'}}>
          <p className="textareaPlaceholder">{textarea}</p>
          <textarea
            placeholder={placeholder}
            type="text"
            className="chat-input"
            value={inputValue}
            onChange={this.textareaChange}
          />
        </div>
        <div className="submit-box" onClick={this.submit}>
          <img src={submitIcon} className="submit-icon-img" />
        </div>
      </div>
    );
  }
}
