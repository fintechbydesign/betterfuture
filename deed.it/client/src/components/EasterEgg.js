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
  const { badge, easterEgg } = props;
  const onClick = () => {
    addEasterEggToLocalUser(easterEgg);
    badge({src: easterEgg});
  }
  return (
    <span className='EasterEgg-text' onClick={onClick}>&nbsp;!&nbsp;</span>
  );
}

export default EasterEgg;
