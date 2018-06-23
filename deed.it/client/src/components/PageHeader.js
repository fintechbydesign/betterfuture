import React from 'react';
import Image from './Image';
import UpdateNotification from './UpdateNotification';
import logo from '../images/logo.svg';
import './PageHeader.css';

function PageHeader (props) {
  const { home } = props;
  return (
    <header className='flexContainerRow PageHeader_container'>
      <Image className='PageHeader_image' alt='logo' src={logo} type='appImage' onClick={home} />
      <div className='PageHeader_title'>Small actions, big impact</div>
      <UpdateNotification {...props} />
    </header>
  );
}

export default PageHeader;
