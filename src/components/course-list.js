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
class CourseList extends Component {
  state = {
  }
  componentDidMount() {
  }
  toDetail = (id) => {
    this.props.history.push(`/course/${id}`);
  }
  render() {
    const {data = []} = this.props;
    return (
      <div style={{overflow: 'hidden', backgroundColor: '#fff', marginTop: 20}}>
        <div className="course-list">
          <h1>全部课程</h1>
          <div className="course-lists">
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
export default withRouter(CourseList);
