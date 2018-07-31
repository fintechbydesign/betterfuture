/* eslint jsx-a11y/alt-text:0 */

import React, { Component } from 'react';
import './Image.css';

const getViewportDimensions = () => {
  return {
    width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  };
}

const getImageDimensions = (mode) => {
  const viewport = getViewportDimensions();
  switch(mode) {
    case 'fixedHeight':
      return {
        height: Math.floor(viewport.height/11)
      };
    case 'fixedWidth':
      return {
        width: Math.floor(viewport.width/3.3)
      };
    default:
      throw new Error(`Unknown image dimension mode ${mode}`);
  }

};

class Image extends Component {

  constructor (props) {
    super(props);
    this.show = this.show.bind(this);
    this.state = { hidden: true, imageDimensions: getImageDimensions('fixedHeight')}
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
