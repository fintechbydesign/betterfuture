import React from 'react';
import Image from './Image';
import Title from './Title';
import './TitleWithImage.css';

function TitleWithImage (props) {
  const { alt, animation, src, text } = props;
  const imageAlt = (alt) ? alt : text;
  const imgClass = (animation) ? `TitleWithImage-icon ${animation}` : 'TitleWithImage-icon';
  return (
    <div className='flexContainerRow TitleWithImage-container' >
      <Image src={src} className={imgClass} alt={imageAlt} />
      <Title text={text} />
    </div>
  );
}

export default TitleWithImage;
