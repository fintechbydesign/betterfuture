import React from 'react';
import Header from '../components/Header.js';
import Instruction from '../components/Instruction.js';

function Error (props) {
  const errMsg = JSON.stringify(props.err);
  return (
    <div>
      <Header text='Sad Face :-(' />
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
