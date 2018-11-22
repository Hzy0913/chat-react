import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {emojiIcon, submitIcon, emojis} from './icon';
import {emoji} from './emoji';
import Popup from '../popup';
import './style.css';

export default class ChatInput extends Component {
  static propTypes = {
    // visible: PropTypes.bool,
    // onCancel: PropTypes.func,
    // children: PropTypes.node
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
    if (className === 'emoji-icon-img' || id === 'emoji-picker-content') return;
    this.setState({visible: false});
  }
  componentWillReceiveProps(nextProps) {
  }
  visiblePopup = (e) => {
    e.stopPropagation();
    const {visible} = this.state;
    console.log(visible);
    this.setState({visible: !visible});
  }
  selectEmoje = ({text}) => {
    const {textarea} = this.state;
    this.setState({visible: true, textarea: `${textarea}[${text}]`});
  }
  submit = (e) => {
    const {userInfo} = this.props;
    const {textarea} = this.state;
    const data = {
      value: textarea,
      timestamp: new Date().getTime(),
      userInfo
    };
    this.props.sendMessage(data);
    this.setState({textarea: ''});
  }
  textareaChange = (e) => {
    this.setState({textarea: e.target.value});
  }
  render() {
    const {visible, textarea} = this.state;
    return (
      <div className="chat-input-wrapper">
        <div className="emoji-box">
          <div
            id="emoji-picker-content"
            onClick={(e) => e.preventDefault()}
            className={`emoji-picker ${visible ? 'emoji-popup-animate-show' : 'popup-animate-hide'}`}
          >
            <div className="emoji-picker-content">
              {emoji.map(v => <div key={v.text}>{v.content}</div>)}
              {emojis.map(v => (<div key={v.text} onClick={(e) => { this.selectEmoje(v); }} ><img src={v.url} /></div>))}
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
            placeholder=""
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
