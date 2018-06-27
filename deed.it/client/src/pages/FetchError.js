import React from 'react';
import Text from '../components/Text';
import Title from '../components/Title';

function FetchError (props) {
  return (
    <div className='page'>
      <Title text='Sad Face :-(' />
      <Text text='Oh dear, your Deedit app could not fetch any data.' />
      <Text text='We are sorry.' />
      <Text text='Do you have a data connection?' />
    </div>
  );
}

export default FetchError;
