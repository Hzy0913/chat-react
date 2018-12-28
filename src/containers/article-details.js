import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Carousel, WingBlank, ListView} from 'antd-mobile';
import {bindActionCreators} from 'redux';
import QueueAnim from 'rc-queue-anim';
import marked from 'marked';
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

highlight.registerLanguage('javascript', javascript);
highlight.registerLanguage('css', css);
highlight.registerLanguage('php', php);
highlight.registerLanguage('python', python);
highlight.registerLanguage('sql', sql);
highlight.registerLanguage('bash', bash);


@connect(
  state => ({auth: state.auth, home: state.home}),
  dispatch => bindActionCreators({...authActions, ...homeActions}, dispatch),
)
export default class ArticleDetails extends Component {
  state = {
    article: {}
  }
  componentDidMount() {
    document.documentElement.classList.add('article-style');
    document.title = 'Binlive';
    const {match: {params: {id} = {}} = {}} = this.props;
    axios.get(`/articleDetails/${id}`).then((res = {}) => {
      document.title = (res.articleDetails || {}).title || 'Binlive';
      this.setState({article: res.articleDetails});
    });
  }
  render() {
    const {
      articleContent = '',
      title,
      label = [],
      date
    } = this.state.article || {};
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight(code, lang) {
        return highlight.highlightAuto(code).value;
      }
    });
    const markHtml = marked(articleContent);
    return (
      <QueueAnim delay={200} duration={800}>
        <div key="1">
          <div className="detail-header">
            <h1>{title}</h1>
            <div className="detail-body-tag">
              <div className="time">{date && dateFormat(new Date(date), 'yyyy-MM-dd')}</div>
              {label.map(item => <span className="tag" key={item}>{item}</span>)}
            </div>
          </div>
          <div
            className="article-content"
            dangerouslySetInnerHTML={{__html: markHtml}}
          />
        </div>
      </QueueAnim>
    );
  }
}
