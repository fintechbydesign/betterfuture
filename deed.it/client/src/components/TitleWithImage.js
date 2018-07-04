import React from 'react';
import Image from './Image';
import Title from './Title';
import './TitleWithImage.css';

function TitleWithImage (props) {
  const { animation, src, text } = props;
  const imgClass = (animation) ? `TitleWithImage-icon ${animation}` : 'TitleWithImage-icon';
  return (
    <div className='flexContainerRow TitleWithImage-container' >
      <Image src={src} className={imgClass} />
      <Title text={text} />
    </div>
  );
}

export default TitleWithImage;
