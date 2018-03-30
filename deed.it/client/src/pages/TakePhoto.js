import React, { createRef, Component } from 'react';
import Button from '../components/Button.js';
import Header from '../components/Header.js';
import Instruction from '../components/Instruction.js';
import send from '../send/sendPhoto.js';

import './TakePhoto.css';

// with thanks to https://www.html5rocks.com/en/tutorials/getusermedia/intro/

class TakePhoto extends Component {

  constructor (props ) {
    super(props);
    ['captureVideo', 'sendPhoto', 'showPhoto', 'startVideo', 'storeImage', 'getUIProperties'].forEach((method) => {
      this[method] = this[method].bind(this);
    });
    this.state = {};
    this.video = createRef();
    this.canvas = createRef();
    this.image = createRef();
  }

  startVideo() {
    const constraints = { video: true };
    const handleSuccess = (stream) => this.video.current.srcObject = stream;
    const handleError = (error) => console.error(error);
    navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
  }

  storeImage (src, width, height) {
    const canvas = this.canvas.current;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(src, 0, 0, width, height);
    const imageData = canvas.toDataURL('image/png');
    this.setState( {...this.state, imageData });
  };

  captureVideo () {
    const video = this.video.current;
    const { videoWidth, videoHeight } = video;
    this.storeImage(video, videoWidth, videoHeight );
  }

  showPhoto () {
    this.image.current.src = this.state.imageData;
  }

  sendPhoto () {
    send(this.state.imageData);
    this.props.chooseReward();
  }

  getUIProperties () {
    if (this.state.imageData) {
      // show picture
      return {
        buttonText: 'Try again',
        buttonFn: () => this.setState({ ...this.state, imageData: undefined }),
        imageClass: '',
        instruction: 'Click/press the picture to send as evidence',
        setupFn: this.showPhoto,
        videoClass: 'TakePhoto-hide'
      }
    } else {
      // show video
      return {
        buttonText: 'Now now',
        buttonFn: this.props.cancel,
        imageClass: 'TakePhoto-hide',
        instruction: 'Click/press the video to take a picture',
        setupFn: this.startVideo,
        videoClass: ''
      }
    }
  }

  render () {
    const { buttonText, buttonFn, imageClass, instruction, setupFn, videoClass } = this.getUIProperties();

    setupFn();
    return (
      <div>
        <Header text='Take a photo of your deed.' />
        <Instruction text={instruction} />
        <video ref={this.video} autoPlay onClick={this.captureVideo} className={videoClass} />
        <img ref={this.image} alt='what will be submitted' onClick={this.sendPhoto} className={imageClass} />
        <canvas ref={this.canvas} className='TakePhoto-hide' />
        <Button click={buttonFn} text={buttonText} />
      </div>
    );
  }
}

export default TakePhoto;
