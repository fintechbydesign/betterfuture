/* eslint jsx-a11y/alt-text:0 */

import React, { Component } from 'react';
import { getImageDimensions, FIXED_HEIGHT } from '../core/wonderwallLayout';
import './Image.css';

class Image extends Component {

  constructor (props) {
    super(props);
    this.show = this.show.bind(this);
    const imageDimensions = (props.imageDimensions) ? props.imageDimensions : getImageDimensions(FIXED_HEIGHT);
    this.state = { hidden: true, imageDimensions };
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
    const { hidden, imageDimensions } = this.state;
    const className = hidden ? 'Image_hide' : 'Image_appear';
    const onLoad = this.show;
    const onClick = isPopup
      ? null
      : setPopupContent.bind(null, (<Image {...this.props} isPopup />));

    const imgSrc = (typeof src !== 'string')
      ? src
      : (src.startsWith('http')  || src.startsWith('/static'))
        ? src
        : `https://assets.deedit.org/${src}`;
    const imgProps = { alt, className, onClick, onLoad, src: imgSrc, ...imageDimensions };
    return (<img {...imgProps} />);
  }
}

export default Image;
