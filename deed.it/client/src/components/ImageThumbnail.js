import React from 'react';
import Image from './Image';
import './ImageThumbnail.css';

function ImageThumbnail (props) {
  const className = (props.active) ? 'ImageThumbnail-default ImageThumbnail-active' : 'ImageThumbnail-default';
  return (<Image src={props.src} alt='thumbnail' className={className} />);
}

export default ImageThumbnail;
