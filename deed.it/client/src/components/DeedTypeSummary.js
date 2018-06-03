import React from 'react';
import Image from './Image';
import Text from './Text';
import superDeedStyling from './superDeed';
import './DeedTypeSummary.css';

function DeedTypeSummary(props) {
  const { image, description, superDeedId } = props;
  const className = `flexContainerRow DeedTypeSummary-container ${superDeedStyling[superDeedId].className}`
  return (
    <div className={className}>
      <Image className='DeedTypeSummary-image' alt='logo' src={image} type='appImage' />
      <Text text={description} />
    </div>
  );
}

export default DeedTypeSummary;
