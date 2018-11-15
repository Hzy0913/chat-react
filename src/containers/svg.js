import React, {Component} from 'react';
import {Artboard, Artboard1} from '../assets/svgs';


class Svg extends Component {
  state = {
  };
  render() {
    const {current} = this.state;
    return (
      <div>
        <svg className="icon" aria-hidden="true" dangerouslySetInnerHTML={{__html: Artboard1}} />
        <svg className="icon" aria-hidden="true" dangerouslySetInnerHTML={{__html: Artboard}} />
        <p>SVG图标</p>
      </div>
    );
  }
}

export default Svg;
