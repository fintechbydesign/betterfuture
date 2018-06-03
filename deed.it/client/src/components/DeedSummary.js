import React from 'react';
import Image from './Image';
import superDeedStyling from '../components/superDeed';
import Text from './Text';
import './DeedSummary.css';

function DeedSummary (props) {
  const { src, description, superDeedId } = props;
  const className = `flexContainerRow DeedSummary-container ${superDeedStyling[superDeedId].className}`
  return (
    <div className={className}>
      <Image className='DeedSummary-image' alt='logo' src={src} type='userImage' />
      <Text text={description} />
    </div>
  );
}

export default DeedSummary;
