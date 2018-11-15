import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from 'store';
import {Button, Modal} from 'antd-mobile';
import {bindActionCreators} from 'redux';
import Calendar from 'react-calendar';
import {next, prev} from '../assets/svgs';

import * as courseActions from '../redux/reduces/course';

@connect(
  state => ({course: state.course}),
  dispatch => bindActionCreators(courseActions, dispatch)
)
export default class ArticleDetails extends Component {
  state = {
    now: new Date().setHours(0, 0, 0, 0),
    modal: false,
    score: '',
    sign: [],
    tip: ''
  }
  componentWillMount() {
    const user = store.get('user') || {};
    const {sign = [], score = ''} = user;
    this.setState({sign, score});
  }
  tileContent = ({date, view}) => {
    if (this.state.now === date.getTime()) {
      return <span>今</span>;
    }
  }
  tileClassName = ({date, view}) => {
    if (this.state.now === date.getTime()) {
      return 'today';
    }
    const {sign = []} = this.state;
    const signed = sign.find(item => item === date.getTime().toString());
    if (signed) {
      return 'signed';
    }
  }
  onClose = () => {
    this.setState({modal: false});
  }
  handleSign = () => {
    const {id} = store.get('user') || {};
    axios.post('/auth/sign', {id}).then(res => {
      console.log(res);
      const {status} = res;
      if (status === 1) {
        this.setState({modal: true, tip: '签到成功'});
      } else if (status === 2) {
        this.setState({modal: true, tip: '提示', status: 2});
      }
    });
  }
  render() {
    const week = new Date().getDay();
    const weeks = {
      0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六'
    };
    const {
      sign, score, tip, status = ''
    } = this.state;
    const nextSvg = <svg className="icon-SVG" aria-hidden="true" dangerouslySetInnerHTML={{__html: next}} />;
    const prevSvg = <svg className="icon-SVG" aria-hidden="true" dangerouslySetInnerHTML={{__html: prev}} />;
    const self = this;
    return (
      <div className="sign-box">
        <Modal
          visible={this.state.modal}
          transparent
          maskClosable
          title={tip}
          onClose={() => this.onClose('modal')}
          footer={[{
            text: '确定',
            onPress: () => { self.onClose('modal'); }
          }]}
        >
          <div style={{height: 40}}>
            {status === 2 ? <p style={{lineHeight: '40px'}}>今日已签到</p> : (<p>恭喜您获得2积分<br />明天请继续签到哦</p>)}
          </div>
        </Modal>
        <div className="Calendar-banner">
          <p className="sign-week">星期{weeks[week]}</p>
          <div className="sign-btn" onClick={this.handleSign}>签到</div>
          {score && <p className="sign-score">积分:{score}</p>}
          <img src="http://img.binlive.cn/upload/1508921355513" />
        </div>
        <Calendar
          value={new Date()}
          className="calendar"
          returnValue="start"
          prevLabel={<i className="iconfont icon-nextstep1" />}
          prev2Label={prevSvg}
          nextLabel={<i className="iconfont icon-nextstep" />}
          next2Label={nextSvg}
          tileClassName={this.tileClassName}
          tileContent={this.tileContent}
        />
      </div>
    );
  }
}
