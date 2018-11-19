import React, {Component} from 'react';
import PropTypes from 'prop-types';
import timeago from 'timeago.js';
import './style.css';
import {emojis} from './icon';
import {dateFormat} from './utils';

const re = /\[[\u4e00-\u9fa5-\w-\d]+\]/g;
let lastDom;
let firstDom;
let isUnshift;
let unshiftLastTimestamp;
let setScrollTop;

export default class ChatInput extends Component {
  static propTypes = {
    // visible: PropTypes.bool,
    // onCancel: PropTypes.func,
    // children: PropTypes.node
  };
  state = {
    // startTimeStamp: 0,
    betweenTime: 1000 * 60 * 5,
    maxTimeago: 1000 * 60 * 60 * 24 * 8
  }
  componentWillMount() {
    // const {visible} = this.props;
    // this.setState({visibleWrapper: !!visible});
  }
  componentDidMount() {
    window.onscroll = () => {
      if (window.pageYOffset < 10) {
        this.setState({loading: true});
      }
      console.log(window.pageYOffset);
    };
    // const {startTimeStamp: propsStartTimeStamp} = this.state;
    // startTimeStamp = propsStartTimeStamp;
  }
  componentWillReceiveProps(nextProps) {
  }
  componentDidUpdate() {
    const {offsetTop} = this.refs[lastDom];
    console.log(this.refs[lastDom]);
    console.log(lastDom);
    console.log(offsetTop);
    window.scrollTo(0, offsetTop);
    setScrollTop = false;
  }
  userAvatarClick = (value) => {
    console.log(value);
  }
  renderMessageList = (data) => {
    const {userInfo: {userId: ownUserId, avatar: ownAvatar, name: ownName} = {}} = this.props;
    const {maxTimeago} = this.state;
    const timeagoInstance = timeago();

    //12132312
    let startTimeStamp = 0;
    setScrollTop = true;
    return data.map((item, itemIndex) => {
      const {timestamp, value, userInfo = {}} = item;
      const {avatar, userId, name} = userInfo;
      const {betweenTime} = this.state;
      const split = value.split(re);
      const found = value.match(re);
      const search = value.search(re);

      console.log(value);
      console.log(split);
      console.log((timestamp - startTimeStamp) > betweenTime);
      let timeInfoNode = '';
      if ((timestamp - startTimeStamp) > betweenTime) {
        timeInfoNode = (new Date().getTime() - timestamp) < maxTimeago ?
          <p className="time-info"><span>{timeagoInstance.format(timestamp, 'zh_CN')}</span></p> :
          <p className="time-info"><span>{dateFormat(timestamp, 'MM月dd hh:mm')}</span></p>;
      }
      startTimeStamp = timestamp;
      // this.setState({startTimeStamp: timestamp});
      const concatChat = [];
      split.forEach(v => {
        const emojiText = ((found || []).shift() || '').replace(/(\[|\])+/g, '');
        if (v) {
          concatChat.push({type: 'text', value: v});
        }
        emojiText && concatChat.push({type: 'emoji', value: emojiText});
      });
      console.log(concatChat);
      const content = concatChat.map((v, index) => {
        const {type, value: chatValue} = v || {};
        switch (type) {
          case 'text':
            return chatValue;
          case 'emoji':
            const {url} = chatValue && emojis.find(emv => emv.text === chatValue) || {};
            return url ? <img key={index} src={url} className="message-content-emoji" /> : `[${chatValue}]`;
          default:
            return v;
        }
        // const emojiText = ((found || []).shift() || '').replace(/(\[|\])+/g, '');
        // console.log(v);
        // console.log(found);
        // console.log(emojiText);
        // const {url} = emojiText && emojis.find(emv => emv.text === emojiText) || {};
        // return url && <img key={index} src={url} className="message-content-emoji" />;
      });
      let lastDomRef = {};
      if (!itemIndex) {
        //第一个元素
        if (!firstDom) {
          // firstDom 为空时 第一次render
          firstDom = timestamp;
        } else if ((firstDom !== timestamp)) {
          // 执行了unshift操作
          const unshiftLastIndex = (data.findIndex(v => v.timestamp === firstDom)) - 1;
          unshiftLastTimestamp = data[unshiftLastIndex].timestamp;
          isUnshift = true;
        } else {
          isUnshift = false;
        }
      } else if (unshiftLastTimestamp === timestamp) {
        lastDomRef = {ref: unshiftLastTimestamp};
        lastDom = unshiftLastTimestamp;
      } else if (!isUnshift && (data.length === (itemIndex + 1))) {
        lastDomRef = {ref: timestamp};
        lastDom = timestamp;
      }
      return (<div key={timestamp} {...lastDomRef}>
        {timeInfoNode}
        <div className={`message-item ${userId.toString() === ownUserId.toString() ? 'message-item-own' : 'message-item-other'}`}>
          <div onClick={() => this.userAvatarClick(userInfo)}>
            <img
              className="message-item-avatar"
              src={avatar}
            />
          </div>
          <p className="message-item-content">{content}</p>
        </div>
      </div>);
    });
  }
  render() {
    const {dataSource = []} = this.props;
    const {loading = false} = this.state;
    return (
      <div className="message-list-wrapper">
        {loading && <div className="message-loading loadEffect">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>}
        {this.renderMessageList(dataSource)}
      </div>
    );
  }
}
