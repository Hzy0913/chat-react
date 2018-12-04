import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List} from 'antd-mobile';
import store from 'store';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as authActions from '../redux/reduces/auth';

const {Item} = List;
const {Brief} = Item;

@connect(
  state => ({auth: state.auth}),
  dispatch => bindActionCreators(authActions, dispatch)
)
class MyList extends Component {
  state = {
  }
  componentDidMount() {
  }
  changeRoute = (route) => {
    this.props.history.push(`/${route}`);
  }
  render() {
    const {id} = store.get('user') || {};
    const supAdmin = id === '59e454ea53107d66ceb0a598';
    let myList = [
      {title: '我的学习', icon: 'icon-xuexi', route: 'learned'},
      {title: '我的签到', icon: 'icon-qiandao', route: 'sign'},
      {title: '分享换分', icon: 'icon-fenxiang1', route: 'share'},
      {title: '测试题目', icon: 'icon-fabiaowenzhang', route: 'learned'},
      {title: '审核分享', icon: 'icon-shenhe', route: 'review'},
      {title: '设置', icon: 'icon-shezhi', route: 'seting'},
    ];
    if (!supAdmin) {
      myList = myList.filter(item => item.route !== 'review');
    }
    return (
      <div className="my-list">
        <List style={{marginTop: 20}}>
          {myList.map(item => (<Item
            key={item.icon}
            thumb={<i className={`iconfont ${item.icon}`} />}
            arrow="horizontal"
            onClick={() => this.changeRoute(item.route)}
          >{item.title}</Item>))}
        </List>
      </div>
    );
  }
}
export default withRouter(MyList);
