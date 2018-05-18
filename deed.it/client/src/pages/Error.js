import React from 'react';
import Text from '../components/Text';
import Title from '../components/Title';
import Instruction from '../components/Instruction';

function Error (props) {
  const errMsg = JSON.stringify(props.err);
  return (
    <div>
      <Title text='Sad Face :-(' />
      <Instruction text='Oh dear, this prototype has errored:' />
      <Text text={errMsg} />
      <div>
        <a onClick={props.reset}>reset</a>
      </div>
    </div>
  );
}

export default Error;
