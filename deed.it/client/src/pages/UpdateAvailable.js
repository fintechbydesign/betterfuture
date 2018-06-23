import React from 'react';
import Text from '../components/Text';
import Title from '../components/Title';

function UpdateAvailable () {
  return (
    <div className='page'>
      <Title text='Update Available' />
      <Text text='There is a newer version of the Deedit application.' />
      <Text text="Simply click the browser 'Refresh' button to update" />
    </div>
  );
}

export default UpdateAvailable;
