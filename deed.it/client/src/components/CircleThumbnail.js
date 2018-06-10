import React from 'react';
import './CircleThumbnail.css';

function CircleThumbnail (props) {
  const { active } = props;
  const style = {
    fill: (active) ? '#002E4A' : 'white'
  }
  return (
    <svg width='24' height='24' className='CircleThumbnail-default'>
      <circle cx='12' cy='12' r='12' style={style} />
    </svg>
  );
}

export default CircleThumbnail;
