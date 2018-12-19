import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from 'store';
import {List, InputItem, Button, Modal} from 'antd-mobile';
import {createForm} from 'rc-form';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import Swal from 'sweetalert2';
import Calendar from 'react-calendar';
import {iconAdd} from '../assets/svgs';

import * as courseActions from '../redux/reduces/course';

const {alert} = Modal;

@connect(
  state => ({course: state.course}),
  dispatch => bindActionCreators(courseActions, dispatch)
)
class Share extends Component {
  state = {
    inputs: ['input0'],
    errors: []
  }
  componentDidMount() {
  }
  onChange = (val, val2) => {
    // console.log(val);
    // console.log(val2);
  }
  deleteInput = (index) => {
    if (this.state.inputs.length === 1) return;
    const inputs = this.state.inputs.filter(item => item !== index);
    this.setState({inputs});
  }
  addInput = () => {
    const {inputs} = this.state;
    inputs.push(`input${inputs.length}`);
    this.setState({inputs});
  }
  submit = () => {
    this.props.form.validateFields((error, value) => {
      if (error) {
        const errors = Object.keys(error).map(item => item);
        return this.setState({errors});
      }
      const length = Object.keys(value).length / 2;
      const content = [];
      for (let i = 0; i < length; i++) {
        const obj = {
          passworld: value[`passwordinput${i}`],
          address: value[`addressinput${i}`]
        };
        content.push(obj);
      }
      alert('提醒', '您确认输入正确完成提交吗？', [
        {text: '取消'},
        {text: '确定', onPress: () => this.shareSave(content)},
      ]);
    });
  }
  shareSave = (content) => {
    const {email} = store.get('user') || {};
    axios.post('/auth/share', {email, content}).then(res => {
      Swal({
        type: 'success',
        confirmButtonText: '完成',
        html: '您的分享已提交成功，<br/>完成审核后会为您自动增加积分',
      }).then((result) => {
        this.props.history.push('/my');
      });
    }).catch(err => {
      Swal({
        type: 'error',
        text: '分享失败',
      });
    });
  }
  render() {
    const {getFieldProps} = this.props.form;
    const {inputs, errors} = this.state;
    const self = this;
    return (
      <div className="share-box">
        <List renderHeader={() => <p style={{color: '#ff6633'}}>分享您的教学视频资源即可获取积分哦</p>}>
          {inputs.map((item, index) => (<div
            style={{marginBottom: 10, position: 'relative'}}
            key={index}
          >
            <InputItem
              onChange={() => this.onChange(`address${item}`)}
              key={`address${index}`}
              clear
              error={errors.includes(`address${item}`)}
              placeholder="请输入您分享的资源地址"
              {...getFieldProps(`address${item}`, {
                onChange() {
                  const newErr = errors.filter(v => v !== `address${item}`);
                  self.setState({errors: newErr});
                },
                rules: [{required: true}],
              })}
            >资源地址</InputItem>
            <InputItem
              onChange={this.onChange}
              clear
              key={`password${index}`}
              placeholder="请输入提取密码(若无密码可不填)"
              {...getFieldProps(`password${item}`)}
            >提取密码</InputItem>
            <Button
              onClick={() => this.deleteInput(item)}
              style={{width: '100%', margin: '0px auto'}}
            >删除该项</Button>
          </div>))}
        </List>
        <Button
          onClick={this.submit}
          type="primary"
          style={{width: '90%', margin: '20px auto 0px'}}
        >确定</Button>
        <div onClick={this.addInput} className="addSVG">
          <svg
            className="icon-SVG"
            aria-hidden="true"
            dangerouslySetInnerHTML={{__html: iconAdd}}
          />
        </div>
      </div>
    );
  }
}

export default createForm()(withRouter(Share));
