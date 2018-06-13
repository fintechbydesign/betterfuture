import React from 'react';
import Image from './Image';
import placeholder from '../images/placeholder.svg';
import badgeImages from '../../../common/src/images/badgeImages';
import './Badge.css';

const getSrc = (src) => {
  if (src in badgeImages) {
    return badgeImages[src];
  } else {
    return placeholder;
  }
}

function Badge (props) {
  return (<Image className='Badge-image' alt='badge' src={getSrc(props.src)} type='appImage' />);
}

export default Badge;
