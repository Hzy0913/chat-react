import React, {Component} from 'react';
import {connect} from 'react-redux';
import bgimg from '../assets/bg.jpg';

class Img extends Component {
  state = {
  };
  render() {
    return (
      <div>
        <img src={bgimg} alt="" />
        <p>雪山风景</p>
      </div>
    );
  }
}


export default Img;
