import React from 'react';
import Image from './Image';
import badgeImages from '../../../common/src/images/badgeImages';
import './Badge.css';

function Badge (props) {
  return (<Image className='Badge-image' alt='badge' src={badgeImages[props.src]} type='appImage' />);
}

export default Badge;
