import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {format} from 'timeago.js';
import IScroll from 'iscroll';
import './style.css';
import {dateFormat} from './utils';
import {errorIcon} from './icon';

const re = /\[[\u4e00-\u9fa5-\w-\d]+\]/g;
let lastDom;
let firstDom;
let unshiftLastTimestamp;
let setScrollTop = true;
let messageLength;
let autoScroll = true;
let isUnShift = false;
let firstDataSourceTimestamp;
let firstRender;

const defaultStyle = {
  height: 500,
  width: '100%'
};
const localLanguage = (navigator.language || navigator.browserLanguage || '').toLowerCase();
const isZh = ~localLanguage.indexOf('zh');

export default class Messages extends Component {
  static propTypes = {
    userInfo: PropTypes.object,
    dataSource: PropTypes.array,
    messageListStyle: PropTypes.object,
    scrollOptions: PropTypes.object,
    scrolltoUpper: PropTypes.func,
    avatarClick: PropTypes.func,
    unreadCountChange: PropTypes.func,
    onScroll: PropTypes.func,
    timeFormat: PropTypes.string,
    timestamp: PropTypes.number,
    timeBetween: PropTypes.number,
    timeagoMax: PropTypes.number,
    loading: PropTypes.bool,
    loader: PropTypes.node,
    noData: PropTypes.bool,
    noDataEle: PropTypes.node
  };
  state = {
    betweenTime: 1000 * 60,
    maxTimeago: 1000 * 60 * 60,
    unreadCount: 0
  }
  componentDidMount() {
    const {scrollbars = {}} = this.props;
    this.myScroll = new IScroll('#massage-container', {
      mouseWheel: true,
      click: true,
      scrollOptions: true,
      ...scrollbars
    });
    const _this = this;
    this.myScroll.on('scrollEnd', function () {
      _this.onScroll(_this, this)
    });
    firstRender = true;
  }
  onScroll(_this, self) {
    const {scrollerHeight, wrapperHeight, y} = self;
    const {loading, scrolltoUpper, noData, onScroll} = _this.props;
    const {unreadCount} = _this.state;
    if (y === 0 && !loading && !noData) {
      scrolltoUpper && scrolltoUpper();
    }
    onScroll && onScroll(self);
    const scrollBottom = scrollerHeight - wrapperHeight + y;
    if (scrollBottom <= 2) {
      autoScroll = true;
      (unreadCount !== 0) && _this.setState({unreadCount: 0});
    } else {
      autoScroll = false;
    }
  }
  setScrollTop = (value) => {
    this.myScroll.scrollTo(0, -value);
  }
  componentWillReceiveProps(nextProps) {
    const {dataSource: nextDataSource = [], timestamp: nextTimestamp, unreadCountChange} = nextProps;
    const {randerTimestamp: prevTimestamp} = this.state;
    if (prevTimestamp !== nextTimestamp) {
      const {timestamp: newDataSourceTimestamp} = nextDataSource[0] || {};
      if (firstDataSourceTimestamp !== newDataSourceTimestamp) {
        autoScroll = true;
        firstDataSourceTimestamp = newDataSourceTimestamp;
        return this.setState({randerTimestamp: nextTimestamp});
      }
      const {userInfo: {userId} = {}} = nextDataSource[nextDataSource.length - 1] || {};
      const {userInfo: {userId: ownUserId} = {}} = nextProps;
      if (userId === ownUserId) {
        autoScroll = true;
        return this.setState({randerTimestamp: nextTimestamp});
      }
      if (!autoScroll) {
        let {unreadCount} = this.state;
        unreadCount += (nextDataSource.length - messageLength);
        unreadCountChange && unreadCountChange(unreadCount);
        this.setState({unreadCount, randerTimestamp: nextTimestamp});
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    const {dataSource: nextDataSource = [], loading: nextLoading, timestamp: nextTimestamp} = nextProps;
    const {dataSource, loading, timestamp} = this.props;
    const {unreadCount} = this.state;
    const {unreadCount: nextUnreadCount} = nextState;
    const dataSourcehasChange = nextDataSource.length !== messageLength;
    setScrollTop = dataSourcehasChange;
    if (timestamp !== nextTimestamp) {
      return true;
    } else if (loading !== nextLoading) {
      return true;
    } else if (unreadCount !== nextUnreadCount) {
      return true;
    }
    return false;
  }
  componentDidUpdate() {
    const lastDomEle = this.refs[lastDom] || {};
    this.myScroll.refresh();
    if (setScrollTop && autoScroll) {
      setScrollTop = false;
      const adimatonTime = (firstRender || isUnShift) ? 0 : undefined;
      isUnShift = false;
      firstRender && (firstRender = false);
      this.myScroll.scrollToElement(lastDomEle, adimatonTime);
    }
  }
  componentWillUnmount() {
    this.myScroll.destroy();
    this.myScroll = null;
  }
  handleRead = () => {
    const {unreadCountChange} = this.props;
    const {scrollerHeight, wrapperHeight} = this.myScroll;
    this.myScroll.scrollTo(0, -(scrollerHeight - wrapperHeight));
    this.setState({unreadCount: 0});
    unreadCountChange && unreadCountChange(0);
  }
  userAvatarClick = (value) => {
    const {avatarClick} = this.props;
    avatarClick && avatarClick(value);
  }
  loaderContent = () => (<div className="loadEffect">
    <span /><span /><span /><span /><span /><span /><span /><span />
  </div>)
  renderMessageList = (data = []) => {
    const {timeBetween = 5, timeagoMax = 24, timeFormat, customEmoticon = []} = this.props;
    messageLength = data.length;
    const {userInfo: {userId: ownUserId, avatar: ownAvatar, name: ownName} = {}} = this.props;
    let {maxTimeago, betweenTime} = this.state;
    maxTimeago *= timeagoMax;
    betweenTime *= timeBetween;
    const language = isZh ? 'zh_CN' : 'en_US';
    const timeFormatString = timeFormat || (isZh ? 'MM月dd hh:mm' : 'MM-dd hh:mm');
    let startTimeStamp = 0;
    return data.map((item, itemIndex) => {
      const {
        timestamp, value, userInfo = {}, error
      } = item;
      const {avatar, userId, name} = userInfo;
      const split = value.split(re);
      const found = value.match(re);
      const search = value.search(re);

      let timeInfoNode = '';
      if ((timestamp - startTimeStamp) > betweenTime) {
        timeInfoNode = (new Date().getTime() - timestamp) < maxTimeago ?
          <p className="time-info"><span>{format(timestamp, language)}</span></p> :
          <p className="time-info"><span>{dateFormat(timestamp, timeFormatString)}</span></p>;
      }
      startTimeStamp = timestamp;
      const concatChat = [];
      split.forEach(v => {
        const emojiText = ((found || []).shift() || '').replace(/(\[|\])+/g, '');
        if (v) {
          concatChat.push({type: 'text', value: v});
        }
        emojiText && concatChat.push({type: 'emoji', value: emojiText});
      });
      const content = concatChat.map((v, index) => {
        const {type, value: chatValue} = v || {};
        switch (type) {
          case 'text':
            return chatValue;
          case 'emoji':
            const {url} = chatValue && customEmoticon.find(emv => emv.text === chatValue) || {};
            return url ? <img key={index} src={url} className="message-content-emoji" /> :
              `[${chatValue}]`;
          default:
            return v;
        }
      });
      let lastDomRef = {};
      if (!itemIndex) {
        if (!firstDom) {
          firstDom = timestamp;
        } else if ((firstDom !== timestamp)) {
          const unshiftLastIndex = (data.findIndex(v => v.timestamp === firstDom)) - 1;
          unshiftLastTimestamp = (data[unshiftLastIndex] || {}).timestamp;
          if (unshiftLastIndex === 0) {
            lastDomRef = {ref: timestamp};
            lastDom = timestamp;
            firstDom = timestamp;
            unshiftLastTimestamp = '';
          }
          isUnShift = true;
        } else {
          isUnShift = false;
        }
      } else if (unshiftLastTimestamp === timestamp) {
        lastDomRef = {ref: unshiftLastTimestamp};
        lastDom = unshiftLastTimestamp;
        firstDom = data[0].timestamp;
        unshiftLastTimestamp = '';
      } else if (!isUnShift && (data.length === (itemIndex + 1))) {
        lastDomRef = {ref: timestamp};
        lastDom = timestamp;
      }
      const isOwn = userId.toString() === ownUserId.toString();
      return (<div key={timestamp} {...lastDomRef}>
        {timeInfoNode}
        <div className={`message-item ${isOwn ? 'message-item-own' : 'message-item-other'}`}>
          <div onClick={() => this.userAvatarClick(userInfo)}>
            <img
              className="message-item-avatar"
              src={avatar}
            />
          </div>
          <p className="message-item-content">
            {content}
            {isOwn && error && <span className="error-status" ><img src={errorIcon} /></span>}
          </p>
        </div>
      </div>);
    });
  }
  render() {
    const {dataSource = [], loading = false, loader, noData, noDataEle, className = '', messageListStyle = defaultStyle} = this.props;
    const {unreadCount} = this.state;
    const noDataElement = noDataEle || (<p className="noData-tips">{isZh ? '没有更多数据了' : 'no more data'}</p>);
    return (
      <div className={`massage-container ${className}`} style={messageListStyle} id="massage-container">
        <div className="message-list-wrapper" ref="message-list-wrapper">
          {!noData && loading && <div className="message-loading">
            {loader || this.loaderContent()}
          </div>}
          {noData && noDataElement}
          {this.renderMessageList(dataSource)}
        </div>
        {!!unreadCount && <div className="unread-count-tips" onClick={this.handleRead}>{unreadCount}</div>}
      </div>
    );
  }
}
