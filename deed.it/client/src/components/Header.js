import React from 'react';
import placeholder from '../images/placeholder.svg';
import './Header.css';

function Header() {
  return (
    <header className='flexContainerRow Header-container'>
      <img src={placeholder} className='Header-image' alt='logo' />
      <div className='Header-title'>DEEDIT</div>
    </header>
  );
};

export default Header;
