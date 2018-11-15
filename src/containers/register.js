import React, {Component} from 'react';
import {createForm} from 'rc-form';
import {Toast} from 'antd-mobile';
import {Link} from 'react-router-dom';

class Login extends Component {
  state = {
    email: '',
    pass: '',
    passRepeat: ''
  }
  handleSubmit = () => {
    const {email, pass, passRepeat} = this.state;
    const re = new RegExp('^[A-Za-zd0-9]+([-_.][A-Za-zd0-9]+)*@(' +
      '[A-Za-zd0-9]+[-.])+[A-Za-zd]{2,5}$');
    const isEmail = re.test(email);
    if (!isEmail) {
      return Toast.info('邮箱验证码格式不正确', 2, null, false);
    } else if (pass.trim().length < 6) {
      return Toast.info('密码长度至少为6位数', 2, null, false);
    } else if (pass.trim() !== passRepeat.trim()) {
      return Toast.info('两次输入的密码不一致', 2, null, false);
    }
    Toast.loading('提交中...', 3000);
    axios.post('/register', {email, passworld: pass}).then(res => {
      const {status, message} = res;
      Toast.hide();
      if (status === 1) {
        return Toast.success('注册邮件已发送，请注意查收', 2, null, false);
      }
      Toast.info(message, 2, null, false);
    }).catch(err => {
      Toast.hide();
      Toast.fail('提交失败请稍后重试', 2, null, false);
    });
  }
  handleChange = (e, type) => {
    if (type === 'email') {
      return this.setState({email: e.target.value});
    } else if (type === 'pass') {
      return this.setState({pass: e.target.value});
    }
    this.setState({passRepeat: e.target.value});
  }
  render() {
    const {getFieldProps} = this.props.form;
    const {email, pass, passRepeat} = this.state;
    return (
      <div className="login register">
        <div className="login-box">
          <div id="email" className="input-item">
            <i className="iconfont icon-nicheng" />
            <input
              type="email"
              placeholder="请输入您的邮箱账号"
              value={email}
              onChange={(value) => this.handleChange(value, 'email')}
            />
          </div>
          <div id="pass" className="input-item">
            <i className="iconfont icon-suo" />
            <input
              type="password"
              placeholder="请输入您的密码"
              value={pass}
              onChange={(value) => this.handleChange(value, 'pass')}
            />
          </div>
          <div id="pass-repeat" className="input-item">
            <i className="iconfont icon-suo" />
            <input
              type="password"
              placeholder="请再次输入您的密码"
              value={passRepeat}
              onChange={(value) => this.handleChange(value, 'passRepeat')}
            />
          </div>
          <button className="login-submit input-item" onClick={this.handleSubmit}>确定</button>
          <div className="directional">
            <Link to="/login" style={{float: 'left'}}>登录</Link>
            <Link to="/resetpass" style={{float: 'right'}}>忘记密码</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default createForm()(Login);
