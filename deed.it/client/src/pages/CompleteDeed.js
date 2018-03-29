import React, { Component } from 'react';
import Button from '../components/Button.js';
import Header from '../components/Header.js';
import Instruction from '../components/Instruction.js';
import './CompleteDeed.css';

class CompleteDeed extends Component { 

  constructor (props ) {
    super(props);
    this.state = { stage: 'reviewPhoto' };
  }

  renderWithVideo () {
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

  renderWithPhoto () {
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
    const imageUI = ( this.state.stage === 'takePhoto' ) ? 
      this.renderWithVideo() :
      this.renderWithPhoto();
    return (
      <div>
        <Header text='Report your deed done by taking a photo of it.' />
        { imageUI }
      </div>
    );
  }
}

export default CompleteDeed;
