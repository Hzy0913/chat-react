import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Carousel, WingBlank, ListView, Popover, Button, Modal, Toast} from 'antd-mobile';
import {bindActionCreators} from 'redux';
import marked from 'marked';
import store from 'store';
import {PhotoSwipeGallery} from 'react-photoswipe';
import 'react-photoswipe/lib/photoswipe.css';
import highlight from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import bash from 'highlight.js/lib/languages/bash';

import * as authActions from '../redux/reduces/auth';
import * as homeActions from '../redux/reduces/home';
import Article from '../components/article';
import '../assets/atom-one-light.css';
import '../style/mark-style.styl';
import {dateFormat} from '../utils';
import Popup from '../components/popup';

highlight.registerLanguage('javascript', javascript);
highlight.registerLanguage('css', css);
highlight.registerLanguage('php', php);
highlight.registerLanguage('python', python);
highlight.registerLanguage('sql', sql);
highlight.registerLanguage('bash', bash);

const {alert} = Modal;

@connect(
  state => ({auth: state.auth, home: state.home}),
  dispatch => bindActionCreators({...authActions, ...homeActions}, dispatch),
)
class ArticleDetails extends Component {
  state = {
    course: {},
    isOpen: false,
    visible: false,
    learned: false,
  }
  componentDidMount() {
    const {match: {params: {id} = {}} = {}} = this.props;
    const {learn} = store.get('user') || {};
    const learned = learn.find(item => item._id === id);
    axios.get(`/courseDetails/${id}`).then(res => {
      this.setState({course: res.courseDetail, learned: !!learned});
    });
  }
  togglePopup = () => {
    this.setState({visible: true});
  }
  onCancel = () => {
    this.setState({visible: false});
  }
  exchangeDetails = () => {
    const {match: {params: {id: courseId} = {}} = {}} = this.props;
    this.props.history.push({pathname: `/course-result/${courseId}`});
  }
  exchange = () => {
    const user = store.get('user') || {};
    const {token, id} = user;
    const {match: {params: {id: courseId} = {}} = {}} = this.props;
    if (!token) {
      this.onCancel();
      alert('登录提示', '您还未登录，是否前往登录?', [
        {text: '取消'},
        {
          text: '确定',
          onPress: () => {
            this.props.history.push('/login');
          }
        }
      ]);
    } else {
      Toast.loading('兑换中请稍后', 10000000);
      axios.post('/auth/getCourse', {id: courseId, userId: id}).then(res => {
        const {course, status, message: messageInfo} = res;
        if (status === 1) {
          Toast.hide();
          Toast.success('课程兑换成功', 0.8, () => {
            this.props.history.push({pathname: `/course-result/${courseId}`, state: {course}});
          });
        } else {
          Toast.hide();
          Toast.info(messageInfo);
        }
      }).catch(err => {
        // console.log(err);
      });
    }
  }
  render() {
    const {
      bannerselect, content = [], introduce, title, score
    } = this.state.course;
    const options = {
      loop: false,
      escKey: true,
      showHideOpacity: true,
      timeToIdle: 4000,
      bgOpacity: 0.8,
      shareEl: false,
      fullscreenEl: false,
      tapToClose: true,
      index: 0
    };
    const items = content.map(item => ({
      thumbnail: item.url,
      src: item.url,
      h: item.h,
      w: item.w,
      title
    }));
    const getThumbnailContent = (item) => <img src={item.thumbnail} width="100%" height="auto" />;
    return (
      <div>
        <Popup visible={this.state.visible} onCancel={this.onCancel} className="course-popup" style={{minHeight: 170}}>
          <div>
            <div className="course-img">
              <img src={bannerselect} />
            </div>
            <div className="introduce-box">
              <div className="introduce-title">
                {title}
              </div>
            </div>
            <p className="course-score">
              积分: <span data-v-257fb33f="">{score}</span>
            </p>
          </div>
          <Button type="primary" className="course-button" onClick={this.exchange}>确定兑换</Button>
        </Popup>
        <div className="course-poster">
          <img src={bannerselect} />
        </div>
        <div className="course-introduce">
          <h1>{title}</h1>
          <p>{introduce}</p>
        </div>
        <PhotoSwipeGallery isOpen={this.state.isOpen} items={items} options={options} thumbnailContent={getThumbnailContent} />
        {this.state.learned ?
          <Button type="primary" className="course-button" onClick={this.exchangeDetails}>课程已获取</Button> :
          <Button type="primary" className="course-button" onClick={this.togglePopup}>获取课程</Button>}
      </div>
    );
  }
}

export default withRouter(ArticleDetails);
