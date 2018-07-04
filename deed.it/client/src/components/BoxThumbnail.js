import React from 'react';
import './BoxThumbnail.css';

function BoxThumbnail (props) {
  const { active } = props;
  const style = {
    fill: (active) ? '#002E4A' : 'white'
  };
  return (
    <svg width='24' height='24' className='BoxThumbnail-default'>
      <rect width='100%' height='100%' style={style} />
    </svg>
  );
}

export default BoxThumbnail;
