import React, {Component} from 'react';
import {Modal, Button, Tabs, Toast} from 'antd-mobile';

const {prompt} = Modal;

class Review extends Component {
  state = {
    audited: [],
    toAudited: []
  }
  componentWillMount() {
    this.shareList();
  }
  shareList = () => {
    axios.get('/auth/shareList').then(res => {
      const {examins = []} = res;
      const audited = [];
      const toAudited = [];
      examins.forEach(item => {
        if (!item.examine) {
          toAudited.push(item);
        } else {
          audited.push(item);
        }
      });
      this.setState({audited: audited.reverse(), toAudited: toAudited.reverse()});
    });
  }
  handleReview = (email, id, score, marks) => {
    Toast.loading('Loading...', 3000);
    axios.post('/review', {
      score, mark: marks, email, examinId: id
    }).then(res => {
      const {status} = res;
      if (status === 1) {
        Toast.hide();
        Toast.info('完成审核');
        this.shareList();
      }
    });
  }
  showReview = (email, id) => {
    prompt(
      '',
      '审核校验',
      (score, mark) => this.handleReview(email, id, score, mark),
      'login-password',
      null,
      ['输入积分', '输入备注'],
    );
  }
  render() {
    const {audited, toAudited} = this.state;
    const tabs = [
      {title: '未审核'},
      {title: '已审核'},
    ];
    return (
      <div className="message-box review">
        <Tabs
          tabs={tabs}
          initialPage={0}
        >
          <div>
            {toAudited.map((item, index) => (<div className="message-item" key={item._id}>
              <div className="item-top">
                <span>{item.email}</span>
                <span style={{float: 'right', margin: 0}}>{item.date.substr(0, 10)}</span>
              </div>
              {item.content.map((v, i) => (<div className="item-content" key={i}>
                <div style={{padding: '5px 0px'}}>地址: <p>{v.address}</p></div>
                <div style={{padding: '5px 0px'}}>提取码: <p>{v.passworld}</p></div>
              </div>))}
              <div className="item-top item-bottom">
                <button className="review-button" onClick={() => this.showReview(item.email, item._id)}>审核</button>
              </div>
            </div>))}
          </div>
          <div>
            {audited.map((item, index) => (<div className="message-item" key={item._id}>
              <div className="item-top">
                <span>{item.email}</span>
                <span style={{float: 'right', margin: 0}}>{item.date.substr(0, 10)}</span>
              </div>
              {item.content.map((v, i) => (<div className="item-content" key={i}>
                <div style={{padding: '5px 0px'}}>地址: <p>{v.address}</p></div>
                <div style={{padding: '5px 0px'}}>提取码: <p>{v.passworld}</p></div>
              </div>))}
            </div>))}
          </div>
        </Tabs>
      </div>
    );
  }
}

export default Review;
