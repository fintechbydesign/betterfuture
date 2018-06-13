import React from 'react';
import Image from './Image';
import Text from './Text';
import './DeedSummary.css';

function DeedSummary (props) {
  const { src, description, style } = props;
  const className = `flexContainerRow DeedSummary-container ${style.className}`
  return (
    <div className={className}>
      <Image className='DeedSummary-image' alt='logo' src={src} type='userImage' />
      <Text text={description} />
    </div>
  );
}

export default DeedSummary;
