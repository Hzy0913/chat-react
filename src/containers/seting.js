import React, {Component} from 'react';
import {createForm} from 'rc-form';
import {Toast} from 'antd-mobile';
import store from 'store';
import {withRouter} from 'react-router-dom';
import Mavatar from 'mavatar';
import Swal from 'sweetalert2';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authActions from '../redux/reduces/auth';

let mavatar;
@connect(
  state => ({auth: state.auth}),
  dispatch => bindActionCreators(authActions, dispatch)
)
class Seting extends Component {
  state = {
    nickName: (store.get('user') || {}).name || '',
    avatar: (store.get('user') || {}).avatar || '',
    avatarHide: !!(store.get('user') || {}).avatar,
    uploadFile: false,
    email: (window.location.search || '').substr(1),
    hash: (window.location.hash || '').substr(1)
  }
  componentDidMount() {
    const {email, hash, avatarHide} = this.state;
    mavatar = new Mavatar({
      el: '#avatar',
      fileOnchange: (e) => {
        if (!avatarHide) {
          Swal({
            title: '温馨提示',
            text: '拖动调整头像位置,双指触摸改变大小',
            imageUrl: 'http://img.binlive.cn/upload/1541000420627touchtip.png',
            imageWidth: '100%',
            animation: true
          });
        }
        this.setState({avatarHide: false, uploadFile: true});
      }
    });
    if (email && hash) {
      axios.post('regSuccess', {email, hash}).then(res => {
        Swal({
          type: 'success',
          title: '注册成功！',
          text: '您的账号已经注册成功,请设置您的信息'
        });
        const {user} = res;
        const {token = ''} = user;
        store.set('user', user);
        axios.defaults.headers.liveid = token;
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    setTimeout(() => {
      this.props.history.push('/my');
    }, 500);
  }
  handleReset = (e) => {
    this.setState({avatarHide: false, uploadFile: false});
    mavatar.resetImage();
  }
  handleChange = (e) => {
    this.setState({nickName: e.target.value.trim()});
  }
  handleSubmit = () => {
    const {nickName, avatarHide, uploadFile} = this.state;
    if (!nickName) {
      return Toast.info('您还未输入昵称');
    }
    if (!avatarHide && !uploadFile) {
      return Toast.info('您还未上传头像');
    }
    if (nickName && !uploadFile) {
      Toast.loading('提交中', 30000);
      return this.updateUser(nickName);
    }
    if (uploadFile) {
      mavatar.imageClipper(dataurl => {
        Toast.loading('提交中', 30000);
        axios.get('/qnToken').then(res => (res || {}).token).then(uptoken => {
          const url = 'http://upload-z1.qiniu.com/putb64/-1';
          const option = {
            method: 'post',
            url,
            headers: {
              'Content-Type': 'application/octet-stream',
              Authorization: `UpToken ${uptoken}`
            },
            data: dataurl.substring(22)
          };
          return axios(option).then(res => this.updateUser(nickName, res.key));
        });
      });
    }
  }
  updateUser = (name, key) => {
    if (name.trim() === (store.get('user') || {}).name && !key) {
      return Toast.hide();
    }
    axios.post('/updateUser', {name, key}).then(res => {
      this.props.userInfo();
      Toast.success('信息修改成功');
    }).catch(err => {
      console.log(err);
      Toast.fail('信息修改失败');
    });
  }
  render() {
    console.log(this.props);
    const {nickName = '', avatar, avatarHide} = this.state;
    return (
      <div className="login register setting">
        <div className="login-box" style={{paddingTop: 20}}>
          <div id="email" className="input-item">
            <i className="iconfont icon-nicheng" />
            <input
              onChange={this.handleChange}
              placeholder="请输入您的昵称"
              value={nickName}
            />
          </div>
          <div id="pass" className="input-item">
            <i className="iconfont icon-touxiang" />
            <p className="avatar-tip">设置头像</p>
            <div className="avatar-box">
              {avatarHide && <img src={avatar} className="avatarPlace" />}
              <div id="avatar" style={{backgroundColor: avatarHide ? 'auto' : '#fff'}} />
              <button onClick={this.handleReset}>重置</button>
            </div>
          </div>
          <button
            className="login-submit input-item seting-button"
            onClick={this.handleSubmit}
          >确定</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Seting);
