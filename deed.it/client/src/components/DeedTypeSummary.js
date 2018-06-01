import React from 'react';
import Image from './Image';
import Text from './Text';
import './DeedTypeSummary.css';

function DeedTypeSummary(props) {
  const { image, description } = props;
  return (
    <header className='flexContainerRow'>
      <Image className='DeedTypeSummary-image' alt='logo' src={image} type='appImage' />
      <Text text={description} />
    </header>
  );
}

export default DeedTypeSummary;
