import React from 'react';
import Text from '../components/Text';
import Title from '../components/Title';

function Error (props) {
  const errMsg = (props.err instanceof Error) ? props.err.message : String(props.err);
  return (
    <div className='page'>
      <Title text='Sad Face :-(' />
      <Text text='Oh dear, we are sorry, your Deedit app has errored:' />
      <Text text={errMsg} />
      <Text text="We’d love you to #deedit." />
      <Text text="The best experience is by phone so grab your mobile phone and capture your good deed at deedit.org." />
    </div>
  );
}

export default Error;
