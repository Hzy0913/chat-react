import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style.styl';

export default class Popup extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    children: PropTypes.node
  };
  state = {
  }
  componentWillMount() {
    const {visible} = this.props;
    this.setState({visibleWrapper: !!visible});
  }
  componentDidMount() {
    const pfx = ['webkit', 'moz', 'MS', 'o', ''];
    function prefixedEventListener(element, type, callback) {
      for (let p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase();
        element.addEventListener(pfx[p] + type, callback, false);
      }
    }
    const animateEle = document.querySelector('.popup-animate-hide');
    prefixedEventListener(animateEle, 'animationend', (e) => {
      if (this.props.visible) return;
      this.setState({visibleWrapper: false});
    });
    document.querySelector('.popup-mask').addEventListener('touchmove', (event) => {
      event.preventDefault();
    }, false);
  }
  componentWillReceiveProps(nextProps) {
    const {visible} = nextProps;
    if (visible) {
      this.setState({visibleWrapper: visible});
    }
  }
  hidePopup = (e) => {
    const {onCancel} = this.props;
    if (onCancel) {
      onCancel(e);
    }
  }
  render() {
    const {
      visible, children, className, style, ...props
    } = this.props;
    const {visibleWrapper} = this.state;
    const popupStyle = {
      width: '100%',
      minHeight: 140,
      position: 'absolute',
      bottom: 0,
      backgroundColor: '#fff',
      ...style
    };
    return (
      <div
        className={`popup-wrapper ${className}`}
        style={{display: `${visibleWrapper ? 'block' : 'none'}`}} {...props}
      >
        <div
          style={popupStyle}
          className={`popup-box ${visible ? 'popup-animate-show' : 'popup-animate-hide'}`}
        >
          {children}
        </div>
        <div
          onClick={this.hidePopup}
          className={`popup-mask ${visible ? 'mask-show' : 'mask-hide'}`}
        />
      </div>
    );
  }
}
