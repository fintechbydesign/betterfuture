import React from 'react';
import Image from './Image';
import communityFirst from '../images/community_first.png';
import communitySecond from '../images/community_second.png';
import greenFirst from '../images/green_first.png';
import greenSecond from '../images/green_second.png';
import socialFirst from '../images/community_first.png';
import socialSecond from '../images/community_second.png';
import placeholder from '../images/placeholder.svg';
import './Badge.css';

const images = {
  'Community Spirit_first': communityFirst,
  'Community Spirit_second': communitySecond,
  'Make Edinburgh Green_first': greenFirst,
  'Make Edinburgh Green_second': greenSecond,
  'Support SocialBite_first': socialFirst,
  'Support SocialBite_second': socialSecond
}

const getSrc = (src) => {
  if (src in images) {
    return images[src];
  } else {
    return placeholder;
  }
}

function Badge (props) {
  const { src } = props;
  return (
      <Image className='Badge-image' alt='badge' src={getSrc(src)} type='appImage' />
  );
}

export default Badge;
