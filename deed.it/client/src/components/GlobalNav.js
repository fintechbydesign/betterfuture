import React from 'react';
import Image from './Image';
import './GlobalNav.css';

function NavItem (props) {
  const { alt, src } = props;
  const imageProps = { alt, src, className: 'GlobalNav-image'};
  return (
    <div className='GlobalNav-item' onClick={props.click}>
      <Image {...imageProps} />
      <div>{props.text}</div>
    </div>
  );
}

function GlobalNav(props) {
  const myDeedsAction = props.user.deeds.current ? props.myProfile : props.pickADeed;
  return (
    <footer className='flexContainerRow GlobalNav-container'>
      <NavItem text='Home' alt='home' click={props.home} />
      <NavItem text='My deeds' alt='my deeds' click={myDeedsAction} />
      <NavItem text='Deedit difference' alt='deedit difference' click={props.notImplemented} />
      <NavItem text='About us' alt='about us' click={props.aboutUs}/>
    </footer>
  );
};

export default GlobalNav;
