import React from 'react';
import Img from 'react-image';
import './Image.css';
import placeholder from '../images/placeholder.svg';

const user = 'user';
const app = 'app';
const roots = {
  user: 'http://aws/',
  app: '/images/'
}

function createSrc (props) {
  if (!props.src) {
    return [placeholder];
  }
  const key = props.origin ? props.origin : 'app';
  const root = roots[key];
  if (!root) throw new Error(`Unknown origin '${props.origin}'`);
  return [`${root}{props.src}`, placeholder];
}

function Image (props) {
  const alt = props.alt ? props.alt : 'placeholder';
  const className = props.className ? props.className : 'Image-default';
  const src = createSrc(props);
  const loader = (<div>To be replaced with loading image</div>);
  return (
    <Img src={src} loader={loader} className={className} alt={alt} />
  );
}

export default Image;
export { app, user };
