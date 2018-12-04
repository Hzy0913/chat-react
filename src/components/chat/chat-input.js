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
  componentWillMount() {
    // const {visible} = this.props;
    // this.setState({visibleWrapper: !!visible});
  }
  componentDidMount() {
    document.addEventListener('click', this.hidePopup, true);
  }
  hidePopup = (e) => {
    console.log(e);
    const {target: {className, id}} = e;
    console.log(className);
    if (className === 'emoji-icon-img' || id === 'emoji-picker-content-warpper') return;
    this.setState({visible: false});
  }
  visiblePopup = (e) => {
    e.stopPropagation();
    const {visible} = this.state;
    console.log(visible);
    this.setState({visible: !visible});
  }
  selectEmoje = ({text}, isEmoji) => {
    console.log(text);
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
    this.setState({textarea: e.target.value});
  }
  render() {
    const {visible, textarea} = this.state;
    const {placeholder, customEmoticon = [], emoji} = this.props;
    const showEmoji = emoji !== false;
    const emojiContent = Array.isArray(emoji) ? [...emojiDefault, ...emoji] : emojiDefault;
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
            value={textarea}
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
