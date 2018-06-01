import React from 'react';
import Image from './Image';
import Text from './Text';
import './DeedSummary.css';

function DeedSummary (props) {
  const { src, description } = props;
  return (
    <header className='flexContainerRow'>
      <Image className='DeedSummary-image' alt='logo' src={src} type='userImage' />
      <Text text={description} />
    </header>
  );
}

export default DeedSummary;
