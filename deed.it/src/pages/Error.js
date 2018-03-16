import React, { Component } from 'react';
import Header from '../components/Header.js';
import Instruction from '../components/Instruction.js';

class Error extends Component { 
  render() {
    const errMsg = JSON.stringify(this.props.err);
    return (
      <div>
        <Header text='Sad Face :-(' />
        <Instruction text='Oh dear, this prototype has errored:' />  
        <div>
           {errMsg}
        </div>
        <div>
          <a onClick={this.props.reset}>reset</a>
        </div>
      </div>
    );
  }
}

export default Error;
