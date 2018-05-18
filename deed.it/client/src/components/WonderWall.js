import React from 'react';
import placeholderImage from '../images/placeholder.svg';
import wonderwallImage from '../images/wonderwall.png';
import './Wonderwall.css';

function WonderWall(props) {
  return (
    <div className='Wonderwall-container'>
      <img src={wonderwallImage} alt='wonderwall background' className='WonderWall-background' />
      <img src={placeholderImage} alt='placeholder' className='WonderWall-image' />
    </div>
  );
};

export default WonderWall;
