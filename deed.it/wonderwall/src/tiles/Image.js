/* eslint jsx-a11y/alt-text:0 */

import React, { Component } from 'react';
import './Image.css';

class Image extends Component {

  constructor (props) {
    super(props);
    this.show = this.show.bind(this);
    this.state = { hidden: true }
  }

  show () {
    const { showParent } = this.props;
    this.setState({
      ...this.state,
      hidden: false
    });
    if (showParent) {
      showParent();
    }
  }

  render () {
    const { alt, src, isPopup, setPopupContent } = this.props;
    const className = this.state.hidden ? 'Image_hide' : 'Image_appear';
    // note expecting images to be correctly proportioned already
    const height = isPopup ? '480' : '240';
    const width = isPopup ? '640' : '320';
    const onLoad = this.show;
    const onClick = isPopup
      ? null
      : setPopupContent.bind(null, (<Image {...this.props} isPopup />));

    const imgSrc = (typeof src !== 'string')
      ? src
      : (src.startsWith('http')  || src.startsWith('/static'))
        ? src
        : `https://assets.deedit.org/${src}`;
    const imgProps = { alt, className, height, width, onClick, onLoad, src: imgSrc };
    return (<img {...imgProps} />);
  }
}

export default Image;
