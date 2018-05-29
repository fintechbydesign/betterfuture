import React from 'react';
import Image from './Image';
import './GlobalNav.css';

function NavItem (props) {
  const { alt, click, src, text } = props;
  const imageProps = { alt, src, className: 'GlobalNav-image'};
  return (
    <div className='GlobalNav-item' onClick={click}>
      <Image {...imageProps} />
      <div>{text}</div>
    </div>
  );
}

function GlobalNav (props) {
  const { aboutUs, home, myProfile, notImplemented, pickADeed, user } = props;
  const myDeedsAction =  user.registered ? myProfile : pickADeed;
  return (
    <footer className='flexContainerRow GlobalNav-container'>
      <NavItem text='Home' alt='home' click={home} />
      <NavItem text='My deeds' alt='my deeds' click={myDeedsAction} />
      <NavItem text='Deedit difference' alt='deedit difference' click={notImplemented} />
      <NavItem text='About us' alt='about us' click={aboutUs} />
    </footer>
  );
}

export default GlobalNav;
