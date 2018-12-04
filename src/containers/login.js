import React, {Component} from 'react';
import {createForm} from 'rc-form';
import {connect} from 'react-redux';
import {Toast} from 'antd-mobile';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as authActions from '../redux/reduces/auth';

@connect(
  state => ({user: state.auth.user}),
  dispatch => bindActionCreators(authActions, dispatch)
)
class Login extends Component {
  state = {
    email: '',
    pass: ''
  }
  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };
  componentWillReceiveProps(nextProps) {
    const {user} = nextProps;
    if (user) {
      return this.context.router.history.push('/');
    }
  }
  handleSubmit = () => {
    const {email, pass = ''} = this.state;
    const re = new RegExp('^[A-Za-zd0-9]+([-_.][A-Za-zd0-9]+)*@(' +
      '[A-Za-zd0-9]+[-.])+[A-Za-zd]{2,5}$');
    const isEmail = re.test(email);
    if (!isEmail) {
      return Toast.info('邮箱验证码格式不正确', 2, null, false);
    }
    if (pass.length < 6) {
      return Toast.info('密码最少为6位数', 2, null, false);
    }
    this.props.login(email, pass);
  }
  handleChange = (e) => {
    const {type} = e.target;
    if (type === 'email') {
      return this.setState({email: e.target.value});
    }
    this.setState({pass: e.target.value});
  }
  render() {
    const {getFieldProps} = this.props.form;
    const {email, pass} = this.state;
    return (
      <div className="login">
        <div className="login-box">
          <div id="email" className="input-item">
            <i className="iconfont icon-nicheng" />
            <input
              onChange={this.handleChange}
              type="email"
              placeholder="请输入您的邮箱账号"
              value={email}
            />
          </div>
          <div id="pass" className="input-item">
            <i className="iconfont icon-yanzhengma-copy" />
            <input
              type="password"
              placeholder="请输入您的密码"
              value={pass}
              onChange={this.handleChange}
            />
          </div>
          <button className="login-submit input-item" onClick={this.handleSubmit}>确定</button>
          <div className="directional">
            <Link to="/register" style={{float: 'left'}}>注册</Link>
            <Link to="/reset-pass" style={{float: 'right'}}>忘记密码</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default createForm()(Login);
