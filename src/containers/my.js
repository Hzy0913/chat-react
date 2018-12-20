import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from 'store';
import {SearchBar, WingBlank, ListView} from 'antd-mobile';
import {bindActionCreators} from 'redux';
import * as authActions from '../redux/reduces/auth';
import Blur from '../components/blur';
import MyList from '../components/my-list';
import CourseHot from '../components/course-hot';
import CourseList from '../components/course-list';

@connect(
  state => ({auth: state.auth}),
  dispatch => bindActionCreators(authActions, dispatch)
)
export default class Course extends Component {
  componentDidMount() {
    const {token} = store.get('user') || {};
    const {userInfo} = this.props;
    token && userInfo();
  }
  render() {
    return (
      <div>
        <Blur />
        <MyList />
      </div>
    );
  }
}
