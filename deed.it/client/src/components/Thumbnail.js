import React from 'react';
import Image from './Image';
import './Thumbnail.css';

function Thumbnail (props) {
  const className = (props.active) ? 'Thumbnail-default Thumbnail-active' : 'Thumbnail-default';
  return (<Image src={props.src} alt='thumbnail' className={className} />);
}

export default Thumbnail;
