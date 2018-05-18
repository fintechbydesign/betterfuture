import React from 'react';
import placeholder from '../images/placeholder.svg';
import './GlobalNav.css';

function NavItem (props) {
  return (
    <div className='GlobalNav-item' onClick={props.click}>
      <img src={props.src} className='GlobalNav-image' alt={props.alt} />
      <div>{props.text}</div>
    </div>
  );
}

function GlobalNav(props) {
  return (
    <footer className='flexContainerRow GlobalNav-container'>
      <NavItem text='Home' alt='home' src={placeholder} click={props.home} />
      <NavItem text='My deeds' alt='my deeds' src={placeholder} click={props.myProfile} />
      <NavItem text='Deedit difference' alt='deedit difference' src={placeholder} click={props.notImplemented} />
      <NavItem text='About us' alt='about us' src={placeholder} click={props.aboutUs}/>
    </footer>
  );
};

export default GlobalNav;
