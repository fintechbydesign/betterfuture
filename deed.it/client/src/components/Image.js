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

function Image (props) {
  const alt = props.alt ? props.alt : 'placeholder';
  const className = props.className ? props.className : 'Image-default';
  const src = createSrc(props);
  /*
  return (
    <img alt={alt} className={className} crossOrigin='anonymous' onClick={props.onClick} onLoad={props.onLoad} src={src} />
  );
  // safari8-9 compatible tag, instead of image, for embedded SVG
  */
  return (
    <object type="image/svg+xml" alt={alt} className={className} crossOrigin='anonymous' onClick={props.onClick} onLoad={props.onLoad} data={src}></object>
  );
}

export default Image;
