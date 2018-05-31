import React from 'react';
import Image from './Image';
import logo from '../images/logo.png';
import './PageHeader.css';

function PageHeader () {
  return (
    <header className='flexContainerRow PageHeader_container'>
      <Image className='PageHeader_image' alt='logo' src={logo} type='appImage' />
      <div className='PageHeader_title'>Small actions, big impact</div>
    </header>
  );
}

export default PageHeader;
