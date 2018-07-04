import React from 'react';
import Image from './Image';
import homeImage from '../images/nav-home.svg';
import homeMyDeeds from '../images/nav-mydeeds.svg';
import homeAboutUs from '../images/nav-aboutus.svg';
import './GlobalNav.css';

function NavItem (props) {
  const { onClick, text, src } = props;
  return (
    <div className='GlobalNav-item' onClick={onClick}>
      <Image src={src} className='GlobalNav-image' />
      <div>{text}</div>
    </div>
  );
}

function GlobalNav (props) {
  const { aboutUs, home, myProfile, pickADeed, user } = props;
  const myDeedsAction = user.registered ? myProfile : pickADeed;
  return (
    <footer className='flexContainerRow GlobalNav-container'>
      <NavItem src={homeImage} text='Home' onClick={home} />
      <NavItem src={homeMyDeeds} text='My deeds' onClick={myDeedsAction} />
      <NavItem src={homeAboutUs} text='About us' onClick={aboutUs} />
    </footer>
  );
}

export default GlobalNav;
