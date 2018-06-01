import React from 'react';
import './GlobalNav.css';

function NavItem (props) {
  const { click, text } = props;
  return (
    <div className='GlobalNav-item' onClick={click}>
      <div>{text}</div>
    </div>
  );
}

function GlobalNav (props) {
  const { aboutUs, deeditDifference, home, myProfile, pickADeed, user } = props;
  const myDeedsAction =  user.registered ? myProfile : pickADeed;
  return (
    <footer className='flexContainerRow GlobalNav-container'>
      <NavItem text='Home' click={home} />
      <NavItem text='My deeds' click={myDeedsAction} />
      <NavItem text='Deedit difference' click={deeditDifference} />
      <NavItem text='About us' click={aboutUs} />
    </footer>
  );
}

export default GlobalNav;
