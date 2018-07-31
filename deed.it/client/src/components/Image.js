import React from 'react';
import rootURLs from '../config/rootURLs';
import './Image.css';

function createSrc (props) {
  const { src, type } = props;
  const key = (type) || 'webImage';

  if (key in rootURLs) {
    return `${rootURLs[key]}${src}`;
  } else {
    throw new Error(`Unknown image type '${type}'`);
  }
}

function isEmbeddedSvg (src) {
  return src.includes('image/svg+xml');
}

function Image (props) {
  const alt = props.alt ? props.alt : 'placeholder';
  const className = props.className ? props.className : 'Image-default';
  const src = createSrc(props);
  return (isEmbeddedSvg(src))
    ? (<object type="image/svg+xml" alt={alt} aria-label={alt} className={className} crossOrigin='anonymous' onClick={props.onClick} onLoad={props.onLoad} data={src}></object>)
    : (<img alt={alt} className={className} crossOrigin='anonymous' onClick={props.onClick} onLoad={props.onLoad} src={src} />);
}

export default Image;
