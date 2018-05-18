import React from 'react';
import placeholder from '../images/placeholder.svg';
import './PageHeader.css';

function PageHeader() {
  return (
    <header className='flexContainerRow PageHeader-container'>
      <img src={placeholder} className='PageHeader-image' alt='logo' />
      <div className='PageHeader-title'>DEEDIT</div>
    </header>
  );
};

export default PageHeader;
