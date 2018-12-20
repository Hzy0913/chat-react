import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from 'store';
import {Button} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';

import * as courseActions from '../redux/reduces/course';

@connect(
  state => ({allLearned: state.course.allLearned}),
  dispatch => bindActionCreators(courseActions, dispatch)
)
class Learned extends Component {
  state = {
    learn: []
  }
  componentWillMount() {
    const user = store.get('user') || {};
    const {learn = []} = user;
    learn.reverse();
    this.setState({learn});
  }
  handleDetails = (id) => this.props.history.push(`/course-result/${id}`)
  render() {
    const {learn = []} = this.state;
    return (
      <div>
        {!learn.length ? <h1 className="result-tip">您还没有学习过的课程</h1> : null}
        {learn.map(item => (<div className="result-introduce learned" key={item._id} onClick={() => this.handleDetails(item._id)}>
          <div className="result-left">
            <h1>{item.title}</h1>
            <h2>
              <p>积分：{item.score}</p>
              <p>标签：
                <span className="learned-tag">{item.tag}</span>
              </p>
            </h2>
          </div>
          <div className="result-right">
            <img src={item.bannerselect} />
          </div>
        </div>))}
      </div>
    );
  }
}
export default withRouter(Learned);
