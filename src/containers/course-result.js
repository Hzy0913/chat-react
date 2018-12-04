import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'antd-mobile';
import store from 'store';
import {bindActionCreators} from 'redux';

import * as authActions from '../redux/reduces/auth';
import * as homeActions from '../redux/reduces/home';

export default class ArticleDetails extends Component {
  state = {
    course: {}
  }
  componentWillMount() {
    console.log(this.props);
    const {match: {params: {id} = {}} = {}} = this.props;
    const {history: {location: {state = {}} = {}} = {}} = this.props;
    const {learn = [], token} = store.get('user') || {};
    let course = learn.find(item => item._id === id);
    console.log(state);
    if (state.course) {
      const {course: stateCourse} = state;
      course = stateCourse;
    }
    console.log(course);
    this.setState({token, course});
  }
  openSource = () => {
    const {address} = this.state.course;
    if (address) {
      window.location.href = address;
    }
  }
  render() {
    const {token, course} = this.state;
    const style = {
      color: '#666',
      fontSize: 16,
      textAlign: 'center',
      marginTop: 30
    };
    if (!token) {
      return (<div style={style}>您还未登录</div>);
    }
    if (!course) {
      return (<div style={style}>您还未获取该课程</div>);
    }
    return (
      <div>
        <div className="result-introduce">
          <div className="result-left">
            <h1>课程名称：{course.title}</h1>
            <h2><p>积分：{course.score}</p> <p>状态：<span>已获取</span></p></h2>
          </div>
          <div className="result-right">
            <img src={course.bannerselect} />
          </div>
        </div>
        <div className="result-box">
          <div className="result-box-header">
            课程详情<i className="iconfont icon-myunpan cloud-icon" />
          </div>
          <div className="result-content">
            课程地址:
            <p>{course.address}</p>
          </div>
          <div className="result-content result-pass">
            提取密码:
            <p>{course.passworld}</p>
          </div>
          <Button type="primary" style={{marginTop: 20}} onClick={this.openSource}>
            跳转至资源页面
          </Button>
        </div>
      </div>
    );
  }
}
