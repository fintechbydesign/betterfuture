import React from 'react';
import Fetching from '../components/Fetching';

function Uploading(props) {
  return (
    <div className='page'>
      <Fetching {...props} />
    </div>
  );
}

export default Uploading;
