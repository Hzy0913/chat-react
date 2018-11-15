import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {TabBar} from 'antd-mobile';
import {bindActionCreators} from 'redux';
import * as authActions from '../redux/reduces/auth';

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
    selectedTab: 'home',
    hidden: false
  };
  componentDidMount() {
    const {location: {pathname: path} = {}, OAuth, auth: {route: Lroute} = {}} = this.props;
    if (!Lroute) OAuth();
    this.visibleTab(path);
    this.context.router.history.listen((route) => {
      const {pathname} = route;
      this.visibleTab(pathname);
    });
  }
  visibleTab = (path = '') => {
    const hiddenRoute = ['learned', 'article-details', 'chat'];
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
            selected={this.state.selectedTab === 'home'}
            onPress={() => this.handleTabBar('')}
          />
          <TabBar.Item
            title="课程"
            key="course"
            icon={<i className="iconfont icon-fengge" {...iconSizeCourse} />}
            selectedIcon={<i className="iconfont icon-fenggepitchon" {...iconSizeCourse} />}
            selected={this.state.selectedTab === 'course'}
            onPress={() => this.handleTabBar('course')}
          />
          <TabBar.Item
            title="聊天"
            key="chat"
            icon={<i className="iconfont icon-xiaoxi" {...iconSizeChat} />}
            selectedIcon={<i className="iconfont icon-xiaoxi" {...iconSizeChat} />}
            selected={this.state.selectedTab === 'chat'}
            badge={1}
            onPress={() => this.handleTabBar('chat')}
          />
          <TabBar.Item
            title="我的"
            key="my"
            icon={<i className="iconfont icon-me_line" {...iconSizeChat} />}
            selectedIcon={<i className="iconfont icon-me_surface" {...iconSizeChat} />}
            selected={this.state.selectedTab === 'my'}
            dot={!!messageSee.length}
            onPress={() => this.handleTabBar('my')}
          />
        </TabBar>
      </div>
    );
  }
}

export default withRouter(Main);
