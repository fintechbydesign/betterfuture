import React from 'react';
import './Menu.css';

function Menu(props) {
  if (props.enable) {
    return (
      <div className='Menu'>
        <h3>WonderWall Options</h3>
        <input type='checkbox' id='debug' onClick={props.toggleDebug} checked={props.debugEnabled}/>
        <label htmlFor="debug">enable debug elements</label>
      </div>
    );
  } else if (props.popupVisible) {
    return null;
  } else {
    return (<img src='./images/menu-icon.png' alt='menu' className='Menu_icon' onClick={props.toggleMenu}/>);
  }
}

export default Menu;