import React from 'react';
import Image from './Image';
import './PageHeader.css';

function PageHeader () {
  return (
    <header className='flexContainerRow PageHeader-container'>
      <Image className='PageHeader-image' alt='logo' />
      <div className='PageHeader-title'>DEEDIT</div>
    </header>
  );
}

export default PageHeader;
