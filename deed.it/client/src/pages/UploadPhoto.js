import React, { createRef, Component } from 'react';
import Button from '../components/Button.js';
import Header from '../components/Header.js';
import Instruction from '../components/Instruction.js';
import { sendPhoto } from '../send/send.js';

import './UploadPhoto.css';
import '../components/Button.css';

class UploadPhoto extends Component {

  constructor (props ) {
    super(props);
    ['fileSelected', 'renderInput', 'sendPhoto', 'showPhoto', 'storeImage', 'getUIProperties'].forEach((method) => {
      this[method] = this[method].bind(this);
    });
    this.state = {};
    this.canvas = createRef();
    this.image = createRef();
  }

  fileSelected (event) {
    const file = event.target.files[0];
    if (file) {
      const fileURL = window.URL.createObjectURL(file);
      const image = new Image();
      image.src = fileURL;
      image.onload = (event) => {
        const height = 480;
        const width = image.width * 480 / image.height;
        this.storeImage(image, width, height);
      }
    }
  }

  storeImage (src, width, height) {
    const canvas = this.canvas.current;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(src, 0, 0, width, height);
    const imageData = canvas.toDataURL('image/png');
    this.setState( {...this.state, imageData });
  };

  showPhoto () {
    this.image.current.src = this.state.imageData;
  }

  sendPhoto () {
    sendPhoto(this.props.user, this.state.imageData);
    this.props.chooseReward();
  }

  getUIProperties () {
    if (this.state.imageData) {
      // show picture
      return {
        buttonText: 'Try again',
        buttonFn: () => this.setState({ ...this.state, imageData: undefined }),
        imageClass: 'Upload-flexFixed',
        inputText: 'Select another picture',
        instruction: 'Click/press the picture to send as evidence',
        setupFn: this.showPhoto
      }
    } else {
      // show select button
      return {
        buttonText: 'Now now',
        buttonFn: this.props.welcomeBack,
        imageClass: 'UploadPhoto-hide',
        inputText: 'Select a picture',
        instruction: 'Click press the button to select a picture',
        setupFn: () => null
      }
    }
  }

  renderInput (text) {
    const labelProps = {
      htmlFor: 'choose',
      className:'Button-normal',
    }
    const inputProps = {
      accept:'image/*',
      className:'UploadPhoto-hidden',
      id: 'choose',
      onChange: this.fileSelected,
      type:"file"
    };
    return (
      <div className={'UploadPhoto-container'}>
        <label {...labelProps}>{text}</label>
        <input {...inputProps} />
      </div>
    );
  }

  render () {
    const { buttonText, buttonFn, imageClass, inputText, instruction, setupFn } = this.getUIProperties();

    setupFn();

    return (
      <div className={'UploadPhoto-container'}>
        <Header text='Upload a photo of your deed.' />
        <Instruction text={instruction}/>
        <img ref={this.image} alt='what will be submitted' onClick={this.sendPhoto} className={imageClass} />
        <canvas ref={this.canvas} className='TakePhoto-hide' />
        {this.renderInput(inputText)}
        <Button click={buttonFn} text={buttonText} />
      </div>
    );
  }
}

export default UploadPhoto;
