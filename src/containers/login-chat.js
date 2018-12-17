import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, Card, Avatar, Col, Row} from 'antd';
import {bindActionCreators} from 'redux';
import * as authActions from '../redux/reduces/auth';
import Input from '../components/Input';

const {Meta} = Card;


class Dev extends Component {
  state = {
  }
  render() {
    return (
      <div>
        <Input />
      </div>
    );
  }
}


//导出组件
export default Dev;
