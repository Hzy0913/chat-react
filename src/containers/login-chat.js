import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import store from 'store';
import {Toast} from 'antd-mobile';
import {bindActionCreators} from 'redux';
import {canvasAnimation} from '../utils/canvas';
import * as authActions from '../redux/reduces/auth';
import {iconNicheng, iconMorenbiaoqing} from '../assets/svgs';

class LoginChat extends Component {
  state = {
    fadeInup: true,
    selectFadeInup: false,
    avatarList: [
      'http://img.binlive.cn/1.png',
      'http://img.binlive.cn/2.png',
      'http://img.binlive.cn/3.png',
      'http://img.binlive.cn/4.png',
      'http://img.binlive.cn/5.png',
      'http://img.binlive.cn/6.png',
      'http://img.binlive.cn/7.png',
      'http://img.binlive.cn/8.png',
      'http://img.binlive.cn/9.png',
    ]
  }
  componentDidMount() {
    // window.canvasdra = true;
    // canvasAnimation();
  }
  componentWillUnmount() {
    window.canvasdra = false;
  }
  returnBack = () => {
    this.props.history.push('/');
  }
  handleSubmit = () => {
    const {avatarList, selectIndex = ''} = this.state;
    if (typeof selectIndex === 'string') {
      return Toast.info('您还未选择头像', 2);
    }
    const timeStamp = Date.now();
    const visitor = {
      avatar: avatarList[selectIndex],
      name: `游客${timeStamp}`,
      id: timeStamp
    };
    store.set('visitor', visitor);
    this.props.history.push('/chat');
  }
  handleSelectAvatar = (selectIndex) => this.setState({selectIndex})
  slectAvatar = () => {
    this.setState({selectFadeInup: true, fadeInup: false});
  }
  render() {
    const {
      fadeInup, selectFadeInup, avatarList, selectIndex = ''
    } = this.state;
    return (
      <div style={{width: '100%', height: '100%', backgroundColor: '#000', position: 'fixed'}} className="chat-login">
        <canvas style={{display: 'block'}} width="1024" height="1024" id="canvas" />
        <div className="iconfont icon-homefill back-home" onClick={this.returnBack}>返回</div>
        <div className={`chat-icon-item ${fadeInup ? 'fadeInUp' : ''}`} onClick={this.handleLogin}>
          <svg
            className="icon-SVG"
            aria-hidden="true"
            dangerouslySetInnerHTML={{__html: iconNicheng}}
          />
          <p>登录</p>
        </div>
        <div className={`chat-icon-item select-avatar ${fadeInup ? 'fadeInUp' : ''}`} onClick={this.slectAvatar}>
          <svg
            className="icon-SVG"
            aria-hidden="true"
            dangerouslySetInnerHTML={{__html: iconMorenbiaoqing}}
          />
          <p>游客模式</p>
        </div>
        <div className={`select-avatars ${selectFadeInup ? 'fadeInUp' : ''}`}>
          <h1>请选择一个您的游客模式头像</h1>
          <i
            className="iconfont icon-guanbi1"
            onClick={() => this.setState({fadeInup: true, selectFadeInup: false})}
          />
          {avatarList.map((item, index) => (<div
            key={index}
            className="select-avatar-item"
            onClick={() => this.handleSelectAvatar(index)}
          >
            <img src={item} />
            {selectIndex === index && <i className="icon-duihao iconfont checked-avatar" />}
          </div>))}
          <div className="avatar-submit" onClick={this.handleSubmit}>确定</div>
        </div>
      </div>
    );
  }
}


//导出组件
export default withRouter(LoginChat);
