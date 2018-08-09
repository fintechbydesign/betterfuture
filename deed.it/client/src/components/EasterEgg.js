import React from 'react';
import { getLocalUser, updateLocalUser } from "../data/user";
import './EasterEgg.css';

function addEasterEggToLocalUser (easterEgg) {
  const user = getLocalUser();
  if( !user.easterEggs) {
    user.easterEggs = [];
  }
  if (!user.easterEggs.includes(easterEgg)) {
    updateLocalUser({
      ...user,
      easterEggs: [...user.easterEggs, easterEgg]
    });
  }
}

function EasterEgg (props) {
  const { badge, className, easterEgg } = props;
  const spanClassName = className ? `EasterEgg-text ${className}` : 'EasterEgg-text';
  const onClick = () => {
    addEasterEggToLocalUser(easterEgg);
    badge({src: easterEgg});
  }
  return (
    <span className={spanClassName} onClick={onClick}>&nbsp;!&nbsp;</span>
  );
}

export default EasterEgg;
