// with thanks to https://www.html5rocks.com/en/tutorials/getusermedia/intro/

import React, { createRef, Component } from 'react';
import Button from '../components/Button.js';
import Text from '../components/Text.js';
import Title from '../components/Title.js';
import './TakePhoto.css';

const methods = ['captureVideo', 'sendPhoto', 'showPhoto', 'startVideo', 'storeImage', 'getUIProperties'];

class TakePhoto extends Component {

  constructor (props ) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
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
    // sendPhoto(this.props.user, this.state.imageData);
    this.props.notImplemented();
  }

  getUIProperties () {
    if (this.state.imageData) {
      // show picture
      return {
        buttonClass: null,
        imageClass: '',
        instruction: 'Click/press the picture to try again',
        setupFn: this.showPhoto,
        videoClass: 'TakePhoto-hide'
      }
    } else {
      // show video
      return {
        buttonClass: 'TakePhoto-hide',
        imageClass: 'TakePhoto-hide',
        instruction: 'Click/press the video to take a picture',
        setupFn: this.startVideo,
        videoClass: ''
      }
    }
  }

  render () {
    const { buttonClass, imageClass, instruction, setupFn, videoClass } = this.getUIProperties();

    setupFn();

    const reset = () => this.setState({ ...this.state, imageData: undefined });

    return (
      <div>
        <Title text='Take a photo of your deed.' />
        <Text text={instruction} />
        <video ref={this.video} autoPlay onClick={this.captureVideo} className={videoClass} />
        <img ref={this.image} alt='what will be submitted' onClick={reset} className={imageClass} />
        <canvas ref={this.canvas} className='TakePhoto-hide' />
        <Button className={buttonClass} click={this.sendPhoto} text='Send picture as evidence >' />
      </div>
    );
  }
}

export default TakePhoto;
