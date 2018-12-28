import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from 'store';
import {Carousel, WingBlank, ListView} from 'antd-mobile';
import {bindActionCreators} from 'redux';
import QueueAnim from 'rc-queue-anim';
import * as authActions from '../redux/reduces/auth';
import * as homeActions from '../redux/reduces/home';

let progress = 0;
@connect(
  state => ({auth: state.auth, home: state.home}),
  dispatch => bindActionCreators({...authActions, ...homeActions}, dispatch),
)
export default class ArticleDetails extends Component {
  state = {
    content: {}
  }
  componentDidMount() {
    const {match: {params: {id} = {}} = {}} = this.props;
    axios.get(`/subject/${id}`).then(res => {
      const {content} = res;
      document.title = (content || {}).title || 'Binlive';
      this.setState({content});
    });
    window.addEventListener('scroll', this.onScroll);
  }
  componentWillUnmount() {
    const {match: {params: {id} = {}} = {}} = this.props;
    window.removeEventListener('scroll', this.onScroll);
    const subjects = store.get('subjects') || {};
    const currentProgress = subjects[id] || 0;
    if ((progress * 100) > currentProgress) {
      subjects[id] = progress.toFixed(2) * 100;
      store.set('subjects', subjects);
    }
  }
  onScroll = (e) => {
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollT;
    const bodyHeight = document.body.scrollHeight;
    const clienHeight = document.body.clientHeight;
    progress = scrollTop / (bodyHeight - clienHeight);
  }
  render() {
    const {
      formDynamic = [],
    } = this.state.content || {};
    return (
      <QueueAnim>
        <div key="animate" style={{padding: 20, backgroundColor: '#fff'}} ref="subject">
          {formDynamic.map((item, index) => (<div className="subject-details-item" key={index}>
            <h1 className="subject-details-title">{index + 1}. {item.value}</h1>
            {!!item.radio && <div className="subject-details-radio">
              {(item.radio || []).map(v => (<p>
                {!v.checked && <i className="icon-none iconfont" />}
                {v.checked && <i className="icon-duihao iconfont" />}
                {v.formval}
              </p>))}
            </div>}
            <p className="subject-details-answer">{item.answer}</p>
          </div>))}
        </div>
      </QueueAnim>
    );
  }
}
