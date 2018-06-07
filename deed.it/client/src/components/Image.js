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
  const loader = (<div>To be replaced with loading image</div>);
  const onLoad = props.onLoad;
  return (
    <Img src={src} loader={loader} className={className} alt={alt} onLoad={onLoad} />
  );
}

export default Image;
