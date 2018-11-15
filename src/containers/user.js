import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table} from 'antd';
import {bindActionCreators} from 'redux';
import {Artboard, Artboard1} from '../assets/svgs';
import * as authActions from '../redux/reduces/auth';

@connect(
  state => ({auth: state.auth}),
  dispatch => bindActionCreators(authActions, dispatch)
)
class User extends Component {
  state = {
  };
  componentWillMount() {
    const {getuser} = this.props;
    getuser();
  }
  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'User',
      dataIndex: 'user',
    }, {
      title: 'Id',
      dataIndex: '_id',
    }];
    const {auth: {userList = []}} = this.props;
    return (
      <div>
        <Table
          style={{
            width: 800,
            margin: '0 auto',
            backgroundColor: '#fff'
          }}
          columns={columns}
          rowKey={record => record._id}
          dataSource={userList}
        />
      </div>
    );
  }
}

export default User;
