/* eslint jsx-a11y/alt-text:0 */

import React, { Component } from 'react';
import './Image.css';

class Image extends Component {

  constructor (props) {
    super(props);
    this.state = { hidden: true }
  }

  render () {
    const { alt, src, isPopup, setPopupContent } = this.props;
    const className = this.state.hidden ? 'Image_hide' : 'Image_appear';
    // note expecting images to be correctly proportioned already
    const height = isPopup ? '480' : '240';
    const width = isPopup ? '640' : '320';
    const onLoad = () => {
      this.setState({
        ...this.state,
        hidden: false
      })
    };
    const onClick = isPopup
      ? null
      : setPopupContent.bind(null, (<Image isPopup {...this.props} />));
    const imgProps = { alt, className, height, width, onClick, onLoad, src };
    return (<img {...imgProps} />);
  }
}

export default Image;
