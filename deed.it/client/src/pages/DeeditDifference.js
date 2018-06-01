import React from 'react';
import Title from '../components/Title';
import './DeeditDifference.css';

const url = 'https://www.theregister.co.uk/';

function DeeditDifference (props) {
  return (
    <div className='page'>
      <Title text='Small deeds make a big difference' />
      <iframe src={url} className='DeeditDifference-iframe' title='deeds'/>
    </div>
  );
}

export default DeeditDifference;
