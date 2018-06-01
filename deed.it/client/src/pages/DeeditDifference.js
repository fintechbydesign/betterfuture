import React from 'react';
import Title from '../components/Title';
import './DeeditDifference.css';

const url = 'https://s3-eu-west-1.amazonaws.com/deedit-smallscreen-dashboard/mini_screen.png';

function DeeditDifference (props) {
  return (
    <div className='page'>
      <Title text='Small deeds make a big difference' />
      <iframe src={url} className='DeeditDifference-iframe' title='deeds'/>
    </div>
  );
}

export default DeeditDifference;
