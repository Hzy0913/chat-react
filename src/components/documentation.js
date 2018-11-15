import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)
class Documentation extends Component {
  state = {
    Documentations: [
      {
        title: 'React',
        url: 'https://doc.react-china.org'
      }, {
        title: 'React-router',
        url: 'https://react-guide.github.io/react-router-cn'
      }, {
        title: 'Redux',
        url: 'http://cn.redux.js.org'
      }, {
        title: 'Redux-order',
        url: 'https://github.com/Hzy0913/redux-order'
      }, {
        title: 'webpack',
        url: 'https://webpack.docschina.org/concepts'
      }
    ]
  };
  render() {
    const {Documentations} = this.state;
    return (
      Documentations.map(item => (
        <div key={item.title} className="documentation-item">
          <a href={item.url} target="_blank" >
            <span style={{width: 120, display: 'inline-block'}}>{item.title}</span>
            <span style={{marginLeft: 30}}>{item.url}</span>
          </a>
        </div>
      ))
    );
  }
}


export default Documentation;
