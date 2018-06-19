import React from 'react';
import Image from '../components/Image';
import './Picture.css';

function Picture (props) {
  const { myProfile, src, type } = props;
  const imageProps = {
    className: 'Picture-image',
    onClick: myProfile,
    src,
    type
  };
  return (
    <Image {...imageProps} />
  );
}

export default Picture;
