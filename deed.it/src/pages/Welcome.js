import React, { Component } from 'react';
import Button from '../components/Button.js';
import Header from '../components/Header.js';
import Instruction from '../components/Instruction.js';

class Welcome extends Component { 
  render() {
    return (
      <div>
        <Header text='Welcome to deed.it' />
        <Instruction text='As this is your first time, we need to register you.' />  
        <Instruction text='We ask some questions about yourself but they are entirely optional.' /> 
        <Button click={this.props.register} text='Register' />
      </div>
    );
  }
}

export default Welcome;
