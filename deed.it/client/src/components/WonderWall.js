import React from 'react';
import Image from './Image';
import wonderwall from '../images/wonderwall.png';
import './Wonderwall.css';

function WonderWall(props) {
  return (
    <div className='Wonderwall-container'>
      <Image src={wonderwall} alt='wonderwall background' className='WonderWall-background' />
      <Image className='WonderWall-image' />
    </div>
  );
};

export default WonderWall;
