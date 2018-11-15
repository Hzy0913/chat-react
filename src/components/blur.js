import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import store from 'store';
import {SearchBar, WingBlank, ListView, Badge} from 'antd-mobile';
import {bindActionCreators} from 'redux';
import * as authActions from '../redux/reduces/auth';

@connect(
  state => ({auth: state.auth}),
  dispatch => bindActionCreators(authActions, dispatch)
)
class Blur extends Component {
  state = {
    avatar: '',
    name: '',
    backgroundImage: 'http://img.binlive.cn/upload/1508050161502'
  }
  componentWillMount() {
    const user = store.get('user') || {};
    const {avatar, name} = user;
    this.setState({avatar, name});
  }
  componentWillReceiveProps(nextProps) {
    const {auth: {user = {}} = {}} = this.props;
    const {auth: {user: nextUser = {}} = {}} = nextProps;
    if (user.avatar !== nextUser.avatar || user.name !== nextUser.name) {
      this.setState({avatar: nextUser.avatar, name: nextUser.name});
    }
  }
  toLogin = () => {
    this.props.history.push('/login');
  }
  toMessage = () => {
    this.props.history.push('/message');
  }
  render() {
    const {avatar, name, backgroundImage} = this.state;
    const {auth: {user: {message = []} = {}} = {}} = this.props;
    const messageSee = message.filter(v => !v.see) || [];
    return (
      <div className="blur">
        <div className="avatar">
          {!name && <i className="iconfont icon-nicheng defulavatar" onClick={this.toLogin} />}
          {name && <img src={avatar} />}
        </div>
        <h1 className="name">{name}</h1>
        <i className="iconfont icon-xiaoxi1 message-button" onClick={this.toMessage}>
          <Badge text={messageSee.length} />
        </i>
        <img src={avatar || backgroundImage} className="blur-img" />
      </div>
    );
  }
}

export default withRouter(Blur);
