import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from 'store';
import QueueAnim from 'rc-queue-anim';
import {Circle} from 'rc-progress';
import {Button} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {dateFormat} from '../utils';

import * as courseActions from '../redux/reduces/course';

@connect(
  state => ({subjects: state.course.subjects}),
  dispatch => bindActionCreators(courseActions, dispatch)
)
class Subject extends Component {
  state = {
  }
  componentWillMount() {
    const {getAllSubject} = this.props;
    getAllSubject();
  }
  handleDetails = (id) => this.props.history.push(`/subject/${id}`)
  render() {
    const {subjects = []} = this.props;
    const subjectsProgaess = store.get('subjects') || {};
    return (
      <QueueAnim>
        <div key="animate" style={{paddingTop: 20}}>
          <QueueAnim>
            {subjects.map(item => (<div
              className="subject-item"
              key={item._id}
              onClick={() => this.handleDetails(item._id)}
            >
              <div className="subject-item-top">
                <div className="progress">
                  <p className="progress-text">{(subjectsProgaess[item._id] || 0).toFixed(2)}%</p>
                  <Circle
                    percent={subjectsProgaess[item._id] || 0}
                    trailColor="rgb(236, 236, 236)"
                    trailWidth="6"
                    strokeWidth="6"
                    strokeColor="rgb(63, 199, 250)"
                  />
                </div>
                <div className="subject-item-content">
                  <h1 className="subject-item-title">{item.title}</h1>
                  <p className="subject-item-introduce">{item.describe}</p>
                </div>
              </div>
              <div className="subject-item-bottom">
                <div className="subject-creat-time">
                  <i className="icon-shijian iconfont" />
                  {dateFormat(item.date, 'yyyy-MM-dd')}
                </div>
                <div className="subject-count">
                  <i className="iconfont icon-wenzhang" />
                  {item.count}
                </div>
              </div>
            </div>))}
          </QueueAnim>
        </div>
      </QueueAnim>
    );
  }
}
export default withRouter(Subject);
