import React, {Component} from 'react';
import {createForm} from 'rc-form';
import {withRouter, Link} from 'react-router-dom';
import {Toast} from 'antd-mobile';
import Swal from 'sweetalert2';

class ResetPass extends Component {
  state = {
    email: '',
    code: '',
    pass: '',
    passRepeat: '',
    timeDown: 60
  }
  sendEmail = () => {
    const {email} = this.state;
    const re = new RegExp('^[A-Za-zd0-9]+([-_.][A-Za-zd0-9]+)*@(' +
      '[A-Za-zd0-9]+[-.])+[A-Za-zd]{2,5}$');
    const isEmail = re.test(email);
    if (!isEmail) {
      return Toast.info('邮箱验证码格式不正确', 2, null, false);
    }
    Swal({
      title: '邮件发送中',
      html: '正在为您发送邮件，请稍后',
      onOpen: () => {
        Swal.showLoading();
      }
    });
    axios.post('/sendRest', {email}).then(res => {
      const {status, message} = res;
      if (status === 1) {
        Swal({
          type: 'success',
          text: '邮件发送成功请查收',
        });
        const timeDownHandle = () => {
          let {timeDown} = this.state;
          if (timeDown < 0) {
            this.setState({timeDown: 60});
          } else {
            timeDown--;
            setTimeout(() => {
              this.setState({timeDown});
              timeDownHandle();
            }, 1000);
          }
        };
        timeDownHandle();
      } else {
        Swal({
          type: 'error',
          text: message,
        });
      }
    }).catch(err => {
      Swal({
        type: 'error',
        text: '邮件发送失败，请稍后重试',
      });
    });
  }
  handleSubmit = () => {
    const {
      email, pass, passRepeat, code
    } = this.state;
    const re = new RegExp('^[A-Za-zd0-9]+([-_.][A-Za-zd0-9]+)*@(' +
      '[A-Za-zd0-9]+[-.])+[A-Za-zd]{2,5}$');
    const isEmail = re.test(email);
    if (!isEmail) {
      return Toast.info('邮箱验证码格式不正确', 2, null, false);
    } else if (code.trim().length < 4) {
      return Toast.info('验证码格式不正确', 2, null, false);
    } else if (pass.trim().length < 6) {
      return Toast.info('密码长度至少为6位数', 2, null, false);
    } else if (pass.trim() !== passRepeat.trim()) {
      return Toast.info('两次输入的密码不一致', 2, null, false);
    }
    Swal({
      html: '提交中请稍后...',
      onOpen: () => {
        Swal.showLoading();
      }
    });
    axios.post('/resetPass', {email, pass, code}).then(res => {
      const {status, message} = res;
      if (status === 1) {
        return Swal({
          title: '密码修改成功',
          text: '您的密码修改成功，是否前往登录？',
          type: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#ccc',
          confirmButtonText: '前往登录',
          cancelButtonText: '取消'
        }).then((result) => {
          if (result.value) {
            return this.props.history.push('/login');
          }
          this.setState({
            pass: '', passRepeat: '', code: ''
          });
        });
      }
      Swal({
        type: 'error',
        text: message,
      });
    }).catch(err => {
      Swal({
        type: 'error',
        text: err,
      });
    });
  }
  handleChange = (e, type) => {
    if (type === 'email') {
      return this.setState({email: e.target.value});
    } else if (type === 'code') {
      this.setState({code: e.target.value});
    } else if (type === 'pass') {
      this.setState({pass: e.target.value});
    } else if (type === 'passRepeat') {
      this.setState({passRepeat: e.target.value});
    }
  }
  render() {
    const {
      email, code, timeDown, pass, passRepeat
    } = this.state;
    return (
      <div className="login register reset-pass">
        <div className="login-box">
          <div id="email" className="input-item">
            <i className="iconfont icon-nicheng" />
            <input
              type="email"
              placeholder="请输入您的邮箱账号"
              value={email}
              onChange={(value) => this.handleChange(value, 'email')}
            />
            {timeDown === 60 ?
              <button className="send-code" onClick={this.sendEmail}>发送验证码</button> :
              <button className="send-code">{timeDown}</button>}
          </div>
          <div id="pass" className="input-item">
            <i className="iconfont icon-suo" />
            <input
              placeholder="请输入您收到的邮箱验证码"
              value={code}
              onChange={(value) => this.handleChange(value, 'code')}
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
          <button className="login-submit input-item" onClick={this.handleSubmit}>发送邮箱验证码</button>
          <div className="directional">
            <Link to="/login" style={{float: 'left'}}>登录</Link>
            <Link to="/register" style={{float: 'right'}}>注册</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ResetPass);
