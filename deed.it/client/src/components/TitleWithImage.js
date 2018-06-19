import React from 'react';
import Image from './Image';
import Title from './Title';
import './TitleWithImage.css';

function TitleWithImage (props) {
  const { src, text } = props;
  return (
    <div className='flexContainerRow TitleWithImage-container' >
      <Image src={src} className='TitleWithImage-icon' />
      <Title text={text} />
    </div>
  );
}

export default TitleWithImage;