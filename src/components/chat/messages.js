import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style.css';
import emojis from './icon';

const re = /\[[\u4e00-\u9fa5-\w-\d]+\]/g;

export default class ChatInput extends Component {
  static propTypes = {
    // visible: PropTypes.bool,
    // onCancel: PropTypes.func,
    // children: PropTypes.node
  };
  state = {
    startTimeStamp: 0,
    betweenTime: 1000 * 60 * 5
  }
  componentWillMount() {
    // const {visible} = this.props;
    // this.setState({visibleWrapper: !!visible});
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
  }
  renderMessageList = (data) => {
    const {timestamp} = data;
    const {startTimeStamp, betweenTime} = this.state;
    const str = '[哇涩]123asda[1231s2]asd[[1231]asdas[a]123]]asda[哈哈哈][哈哈gof][哈哈2]';
    const split = str.split(re);
    const found = str.match(re);
    const search = str.search(re);

    const timeInfoNode = ((timestamp - startTimeStamp) > betweenTime) ?
      <p className="time-info">{timestamp}</p> : null;
    const content = split.map((item, index) => {
      if (!item) return;
      const emojiText = found[index].replace(/(\[|\])+/g, '');
      const {url} = emojis.find(emv => emv.text === emojiText) || {};
      return (<span>{item}{found[index] && <img src={url} />}</span>);
    });
    return (<div>
      {timeInfoNode}
      <div className="message-item message-item-other">
        <img className="message-item-avatar" src="http://img.binlive.cn/1.png" />
        <p className="message-item-content">{content}</p>
      </div>
    </div>);
  }
  render() {
    const {loading = false} = this.props;
    return (
      <div>
        {loading && <div className="message-loading">loading...</div>}
        <div className="time-info">123</div>
        <div className="message-item message-item-other">
          <img className="message-item-avatar" src="http://img.binlive.cn/1.png" />
          <p className="message-item-content">12312311323</p>
        </div>
        <div className="message-item message-item-own">
          <img className="message-item-avatar" src="http://img.binlive.cn/1.png" />
          <p className="message-item-content">12312311323</p>
        </div>
        <h1>12312</h1>
        <h1>12312</h1>
        <h1>12312</h1>
        <h1>12312</h1>
        <h1>12312</h1>
      </div>
    );
  }
}
