import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SearchBar, WingBlank, ListView} from 'antd-mobile';
import {bindActionCreators} from 'redux';
import * as courseActions from '../redux/reduces/course';
import Article from '../components/article';
import CourseHot from '../components/course-hot';
import CourseList from '../components/course-list';

@connect(
  state => ({course: state.course}),
  dispatch => bindActionCreators(courseActions, dispatch)
)
export default class Course extends Component {
  state = {
    searchData: [],
    searchValue: '',
    searchListVisible: false
  }
  componentDidMount() {
    const {getHotCourse, getAllCourse, course = {}} = this.props;
    const {allCourse = [], hotCourse = []} = course;
    if (!allCourse.length) {
      getAllCourse();
    }
    if (!hotCourse.length) {
      getHotCourse();
    }
  }
  searchOnChange = (search) => {
    this.setState({searchValue: search, searchListVisible: true});
    if (!search) {
      return this.setState({searchData: []});
    }
    axios.post('/searchCourse', {search}).then(res => {
      this.setState({searchData: res.searchList});
    });
  }
  onFocus = () => {
    this.setState({searchListVisible: true});
  }
  searchOnCancel = () => {
    this.setState({searchData: [], searchValue: '', searchListVisible: false});
  }
  toDetail = (id) => {
    this.props.history.push(`/course/${id}`);
  }
  render() {
    const {course: {allCourse = [], hotCourse = []} = {}} = this.props;
    const {
      cardList = [], searchData = [], searchValue, searchListVisible
    } = this.state;
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
    return (
      <div style={{paddingTop: 44}}>
        <SearchBar
          placeholder="课程搜索"
          maxLength={8}
          className="search"
          value={searchValue}
          onChange={this.searchOnChange}
          onCancel={this.searchOnCancel}
          onClear={this.searchOnCancel}
          onFocus={this.onFocus}
        />
        {searchListVisible && <div className="search-list">
          {searchData.map(item =>
            (<div
              className="search-item"
              key={item._id}
              onClick={() => this.toDetail(item._id)}
            >{item.title}</div>))}
        </div>}
        <CourseHot data={hotCourse} />
        <CourseList data={allCourse} />
      </div>
    );
  }
}
