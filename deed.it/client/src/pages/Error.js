import React from 'react';
import Title from '../components/Title.js';
import Instruction from '../components/Instruction.js';

function Error (props) {
  const errMsg = JSON.stringify(props.err);
  return (
    <div>
      <Title text='Sad Face :-(' />
      <Instruction text='Oh dear, this prototype has errored:' />
      <div>
         {errMsg}
      </div>
      <div>
        <a onClick={props.reset}>reset</a>
      </div>
    </div>
  );
}

export default Error;
