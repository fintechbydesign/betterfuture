/*
 not a component but metadata about superdeeds
 COMPLETELY coupled to deed hierarchy from database!
*/
import React from 'react';
import './superDeed.css';

const happy = {
  'background-color': '#0E88FC',
  className: 'SuperDeed-happy',
  callout: null,
  id: 'Community Spirit'
};

const green = {
  'background-color': '#20BCA4',
  className: 'SuperDeed-green',
  callout: null,
  id: 'Make Edinburgh Green'
};

const homeless = {
  'background-color': '#FF6112',
  className: 'SuperDeed-homeless',
  callout: (<div className='PickADeed-callout'>In partnership with Social Bite</div>),
  id: 'Support SocialBite'
};

const map = {};
[happy, green, homeless].forEach((meta, index) => {
  map[index] = meta;
  map[meta.id] = meta;
});

export default map;