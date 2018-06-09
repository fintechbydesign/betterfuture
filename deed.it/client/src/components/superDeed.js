/*
 not a component but metadata about superdeeds
 COMPLETELY coupled to deed hierarchy from database!
*/
import React from 'react';
import greenIcon from '../images/green-deed-small.svg';
import happyIcon from '../images/happy-deed-small.svg';
import homelessIcon from '../images/socialbite-small.svg';

import './superDeed.css';

const happy = {
  'background-color': '#0E88FC',
  className: 'SuperDeed-happy',
  callout: null,
  id: 'Community Spirit',
  icon: happyIcon
};

const green = {
  'background-color': '#20BCA4',
  className: 'SuperDeed-green',
  callout: null,
  id: 'Make Edinburgh Green',
  icon: greenIcon
};

const homeless = {
  'background-color': '#FF6112',
  className: 'SuperDeed-homeless',
  callout: (<div className='PickADeed-callout'>In partnership with Social Bite</div>),
  id: 'Support SocialBite',
  icon: homelessIcon
};

const map = {};
[happy, green, homeless].forEach((meta, index) => {
  map[index] = meta;
  map[meta.id] = meta;
});

export default map;