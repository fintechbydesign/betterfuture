import React from 'react';
import Text from '../components/Text';
import Title from '../components/Title';

function Error (props) {
  const errMsg = (props.err instanceof Error) ? props.err.message : String(props.err);
  return (
    <div className='page'>
      <Title text='Sad Face :-(' />
      <Text text='Oh dear, your Deedit app has errored:' />
      <Text text={errMsg} />
      <Text text='We are sorry.' />
      <Text text='Use one of the navigation buttons below to continue' />
    </div>
  );
}

export default Error;
