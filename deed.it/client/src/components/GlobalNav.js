import React from 'react';
import './GlobalNav.css';

function NavItem (props) {
  const { onClick, text } = props;
  return (
    <div className='GlobalNav-item' onClick={onClick}>
      <div>{text}</div>
    </div>
  );
}

function GlobalNav (props) {
  const { aboutUs, deeditDifference, home, myProfile, pickADeed, user } = props;
  const myDeedsAction =  user.registered ? myProfile : pickADeed;
  return (
    <footer className='flexContainerRow GlobalNav-container'>
      <NavItem text='Home' onClick={home} />
      <NavItem text='My deeds' onClick={myDeedsAction} />
      <NavItem text='Deedit difference' onClick={deeditDifference} />
      <NavItem text='About us' onClick={aboutUs} />
    </footer>
  );
}

export default GlobalNav;
