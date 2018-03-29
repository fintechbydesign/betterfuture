import React, { Component } from 'react';
import Button from '../components/Button.js';
import Header from '../components/Header.js';
import Instruction from '../components/Instruction.js';
import './CompleteDeed.css';

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
            <input type='radio' id='takePhoto' onChange={optionChosen}></input>
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
          <Button click={this.props.submit} text='Report deed done' />
        </div>
        <div>
          <Button click={this.props.cancel} text='Not now' />
        </div>
      </div>
    );
  }

  renderVideo () {
    return (
      <div>
        <Instruction text='Click the picture to take a photo:' />
        <div>
          <video id='video' autoPlay />
          <img id='photo' alt='what will be submitted' className='CompleteDeed-hide' />
          <canvas id='canvas' className='CompleteDeed-hide' />
        </div>
      </div>);
  }

  renderPhoto () {
    const imageSrc = `${process.env.PUBLIC_URL}/placeholder.png`;
    return (
      <div>
        <div>
          <img src={imageSrc} alt='placeholder' />
        </div>
        <div>
          <Button click={this.props.submit} text='Report deed done' />
        </div>
        <div>
          <Button click={this.props.cancel} text='Not now' />
        </div>
    </div>);
  }

  render () {
    let content;
    switch(this.state.stage) {
      case 'takePhoto':
        content = this.renderVideo();
        break;
      case 'confirmPhoto':
        content = this.renderPhoto();
        break;
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
