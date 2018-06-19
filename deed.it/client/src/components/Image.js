import React from 'react';
import Img from 'react-image';
import rootURLs from '../config/rootURLs';
import placeholder from '../images/placeholder.svg';
import './Image.css';

function createSrc (props) {
  if (!props.src) {
    return [placeholder];
  }
  const key = props.type ? props.type : 'webImage';
  if (key in rootURLs) {
    return [`${rootURLs[key]}${props.src}`, placeholder];
  } else {
    throw new Error(`Unknown image type '${props.type}'`);
  }
}

function Image (props) {
  const alt = props.alt ? props.alt : 'placeholder';
  const className = props.className ? props.className : 'Image-default';
  const src = createSrc(props);
  return (
    <Img alt={alt} className={className} loader={props.loader} onClick={props.onClick} onLoad={props.onLoad} src={src} />
  );
}

export default Image;
