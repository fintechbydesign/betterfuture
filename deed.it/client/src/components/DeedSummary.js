/*
  For either deeds or deed types
 */
import React from 'react';
import Image from './Image';
import Text from './Text';
import './DeedSummary.css';

function DeedSummary (props) {
  return (
    <header className='flexContainerRow'>
      <Image className='DeedSummary-image' alt='logo' src={props.image} type='userImage' />
      <Text text={props.description} />
    </header>
  );
}

export default DeedSummary;
