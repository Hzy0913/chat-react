import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {ListView, Tag, ActivityIndicator} from 'antd-mobile';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {dateFormat} from '../utils';
import * as homeActions from '../redux/reduces/home';
import * as authActions from '../redux/reduces/auth';

const posters = {
  javascript: 'http://img.binlive.cn/upload/1508147650899',
  node: 'http://img.binlive.cn/upload/1508147665291',
  css: 'http://img.binlive.cn/upload/1508147554750',
  html5: 'http://img.binlive.cn/upload/1508147586798',
  jquery: 'http://img.binlive.cn/upload/1508147631388',
  vue: 'http://img.binlive.cn/upload/1508147700511',
  git: 'http://img.binlive.cn/upload/1508147609623',
  react: 'http://img.binlive.cn/upload/1525527435206react.png'
};

@connect(
  state => ({
    articles: state.home.articleList,
    page: state.home.page,
    dataEnd: state.home.dataEnd,
    articleLoading: state.home.articleLoading,
    windowScrollTop: state.home.windowScrollTop
  }),
  dispatch => bindActionCreators(homeActions, dispatch),
)
class Article extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      pageIndex: 0,
      dataSource,
      hasMore: true,
      initialListSize: 10
    };
  }
  componentWillMount() {
    const {getArticle, page, articles = []} = this.props;
    if (!page) {
      getArticle(page);
    } else {
      this.setState({
        initialListSize: articles.length,
        dataSource: this.state.dataSource.cloneWithRows(articles),
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.articles),
      pageIndex: ++this.state.pageIndex,
      hasMore: nextProps.dataEndLength === 0 ? false : !(nextProps.articles.length % 10)
    });
  }
  onEndReached = (event) => {
    const {getArticle, page} = this.props;
    if (!this.state.hasMore || this.props.articleLoading) return;
    getArticle(page);
  }
  toArticle = (id) => {
    this.props.history.push(`/article-details/${id}`);
  }
  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    const {articleLoading = []} = this.props;
    const row = (rowData, sectionID, rowID) => {
      const obj = rowData;
      return (
        <div key={rowID} style={{padding: '0 15px'}} onClick={() => this.toArticle(obj._id)}>
          <div style={{display: 'flex', padding: '15px 0'}} className="article">
            <img
              style={{height: '95px', width: '72px', marginRight: '15px'}}
              src={posters[obj.tag]}
            />
            <div>
              <div
                style={{
                  height: '70px',
                  lineHeight: '28px',
                  color: '#555',
                  fontSize: 18,
                }}
              >{obj.title}</div>
              {obj.label.map(item => (<Tag
                key={item}
                style={{backgroundColor: '#77b891', color: '#fff', marginRight: 4}}
              >{item}</Tag>))}
            </div>
          </div>
        </div>
      );
    };
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderHeader={() => <span>header</span>}
        renderFooter={() => (<div style={{textAlign: 'center'}}>
          {this.state.hasMore ? <ActivityIndicator
            animating={articleLoading}
            className="article-loading"
            text="数据加载中..."
          /> : '没有更多数据了'}
        </div>)}
        renderRow={row}
        initialListSize={this.state.initialListSize}
        renderSeparator={separator}
        className="am-list"
        pageSize={4}
        useBodyScroll
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}
export default withRouter(Article);
