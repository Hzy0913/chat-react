import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {dateFormat} from '../utils';
import * as authActions from '../redux/reduces/auth';

@connect(
  state => ({auth: state.auth}),
  dispatch => bindActionCreators(authActions, dispatch)
)
class Message extends Component {
  componentDidMount() {
    axios.get('/readMessage').then(res => {
      const {status} = res;
      if (status === 1) {
        const {userInfo} = this.props;
        userInfo();
      }
    });
  }
  render() {
    const {auth: {user: {message = []} = {}} = {}} = this.props;
    return (
      <div className="message-box">
        {!message.length ? <p className="noMessage-tip">您暂时还没有任何消息</p> : null}
        {message.map(v => (<div className="message-item" key={v.date}>
          <div className="item-top">
            <span>{dateFormat(v.date, 'yyyy-MM-dd')}</span>
            <p>{v.addscore ? `完成审核,为您增加${v.addscore}积分` : '系统通知'}</p>
          </div>
          <div className="item-top item-bottom">
            <span>消息</span>
            <p>{v.remarks}</p>
          </div>
        </div>))}
      </div>
    );
  }
}

export default Message;
