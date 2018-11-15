import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {SearchBar, WingBlank, ListView} from 'antd-mobile';
import {bindActionCreators} from 'redux';
import * as authActions from '../redux/reduces/auth';

@connect(
  state => ({auth: state.auth}),
  dispatch => bindActionCreators(authActions, dispatch)
)
class Course extends Component {
  state = {
  }
  toDetail = (id) => {
    this.props.history.push(`/course/${id}`);
  }
  render() {
    const {data = []} = this.props;
    return (
      <div style={{overflow: 'hidden', backgroundColor: '#fff'}}>
        <div className="course-hot">
          <div className="course-hot-img">
            <i className="iconfont icon-remen" />
            <h1>热门课程</h1>
          </div>
          <div className="course-hots">
            {data.map(item =>
              (<div
                className="course-item"
                key={item._id}
                onClick={() => this.toDetail(item._id)}
              >
                {item.title}
              </div>))}
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Course);
