import React, { Component } from 'react';
import Button from '../components/Button.js';
import Header from '../components/Header.js';
import Instruction from '../components/Instruction.js';

class CompleteDeed extends Component { 

  constructor (props ) {
    super(props);
    this.state = { stage: 'choose' };
  }

  renderChoice () {
    const optionChosen = (event) => this.setState({...this.state, stage: event.target.id});
    return (
      <div>
        <Instruction text='Choose how to report the deed done:' />
        <fieldset>
          <div>
            <input type='radio' id='takePhoto' onChange={this.props.takePhoto}></input>
            <label htmlFor='takePhoto'>Take a photo of the done deed</label>
          </div>
          <div>
            <input type='radio' id='declaration' onChange={optionChosen}></input>
            <label htmlFor='declaration'>Simply report it complete</label>
          </div>
        </fieldset>
        <div>
          <Button click={this.props.cancel} text='Not now' />
        </div>
      </div>
    );
  }

  renderDeclaration () {
    return (
      <div>
        I declare the deed done!
        <div>
          <Button click={this.props.chooseReward} text='Report deed done' />
        </div>
        <div>
          <Button click={this.props.welcomeBack} text='Not now' />
        </div>
      </div>
    );
  }

  render () {
    let content;
    switch(this.state.stage) {
      case 'declaration':
        content = this.renderDeclaration();
        break;
      default:
        content = this.renderChoice();
    }
    return (
      <div>
        <Header text='Report your deed done.' />
        { content }
      </div>
    );
  }
}

export default CompleteDeed;
