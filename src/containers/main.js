import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import store from 'store';
import {Link, withRouter} from 'react-router-dom';
import {TabBar} from 'antd-mobile';
import {bindActionCreators} from 'redux';
import * as authActions from '../redux/reduces/auth';

let listener = null;
@connect(
  state => ({auth: state.auth}),
  dispatch => bindActionCreators(authActions, dispatch)
)
class Main extends Component {
  static propTypes = {
    auth: PropTypes.object
  };
  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };
  state = {
    selectedTab: '',
    hidden: false
  };
  componentWillMount() {
    const {location: {pathname: path} = {}, OAuth, auth: {route: Lroute} = {}} = this.props;
    const {token} = store.get('user') || {};
    this.setState({selectedTab: ((path || '').split('/')[1] || '')});
    if (!Lroute && token) OAuth();
    this.visibleTab(path);
    listener = this.context.router.history.listen((route) => {
      const {pathname} = route;
      this.changeTiele(pathname);
      this.setState({selectedTab: ((pathname || '').split('/')[1] || '')});
      this.visibleTab(pathname);
    });
  }
  componentWillUnmount() {
    listener();
  }
  changeTiele = (path) => {
    const titles = {
      '': 'Binlive',
      course: '课程',
      chat: 'Binlive',
      my: '个人中心',
      learned: '学习过的课程',
      sign: '每日签到',
      share: '分享换分',
      subject: '测试题目',
      seting: '设置',
      message: '消息中心',
      'login-chat': '聊天室登录',
      'article-details': false
    };
    const [un, route] = path.split('/') || [];
    if (!titles[route]) return;
    document.documentElement.classList.remove('article-style');
    document.title = titles[route];
  }
  visibleTab = (path = '') => {
    const hiddenRoute = ['learned', 'article-details', 'chat', 'login-chat'];
    const hidden = hiddenRoute.includes((path.split('/') || [])[1]);
    this.setState({hidden});
  }
  handleTabBar = (selectedTab) => {
    this.setState({selectedTab});
    this.props.history.push(`/${selectedTab}`);
  }
  render() {
    const contentStyle = {
      background: '#fff',
      padding: 24,
      margin: 0,
      minHeight: 280
    };
    const iconSize = {
      style: {fontSize: 22}
    };
    const iconSizeCourse = {
      style: {fontSize: 20}
    };
    const iconSizeChat = {
      style: {fontSize: 24}
    };
    const {selectedTab} = this.state;
    const {auth: {user: {message = []} = {}} = {}} = this.props;
    const messageSee = message.filter(v => !v.see) || [];
    return (
      <div>
        <div className="content">{this.props.children}</div>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#77b891"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="home"
            icon={<i className="iconfont icon-home" {...iconSize} />}
            selectedIcon={<i className="iconfont icon-homefill" {...iconSize} />}
            selected={selectedTab === ''}
            onPress={() => this.handleTabBar('')}
          />
          <TabBar.Item
            title="课程"
            key="course"
            icon={<i className="iconfont icon-fengge" {...iconSizeCourse} />}
            selectedIcon={<i className="iconfont icon-fenggepitchon" {...iconSizeCourse} />}
            selected={['course-result', 'course'].includes(selectedTab)}
            onPress={() => this.handleTabBar('course')}
          />
          <TabBar.Item
            title="聊天"
            key="chat"
            icon={<i className="iconfont icon-xiaoxi" {...iconSizeChat} />}
            selectedIcon={<i className="iconfont icon-xiaoxi" {...iconSizeChat} />}
            selected={selectedTab === 'chat'}
            onPress={() => {
              const {id} = store.get('user') || store.get('visitor') || {};
              const route = id ? 'chat' : 'login-chat';
              this.handleTabBar(route);
            }}
          />
          <TabBar.Item
            title="我的"
            key="my"
            icon={<i className="iconfont icon-me_line" {...iconSizeChat} />}
            selectedIcon={<i className="iconfont icon-me_surface" {...iconSizeChat} />}
            selected={['sign', 'my', 'share'].includes(selectedTab)}
            dot={!!messageSee.length}
            onPress={() => this.handleTabBar('my')}
          />
        </TabBar>
      </div>
    );
  }
}

export default withRouter(Main);
