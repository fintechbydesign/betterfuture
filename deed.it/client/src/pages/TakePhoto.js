// with thanks to https://www.html5rocks.com/en/tutorials/getusermedia/intro/

import React, { createRef, Component } from 'react';
import Button from '../components/Button';
import Text from '../components/Text.js';
import Title from '../components/Title.js';
import { initS3 } from '../data/S3';

const methods = ['captureVideo', 'reset', 'sendPhoto', 'showPhoto', 'startVideo', 'storeImage', 'getUIProperties'];

class TakePhoto extends Component {
  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = {};
    this.video = createRef();
    this.canvas = createRef();
    this.image = createRef();
  }

  componentDidMount () {
    initS3();
  }

  startVideo () {
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
    this.setState({...this.state, imageData });
  }

  captureVideo () {
    const video = this.video.current;
    const { videoWidth, videoHeight } = video;
    this.storeImage(video, videoWidth, videoHeight);
  }

  showPhoto () {
    this.image.current.src = this.state.imageData;
  }

  sendPhoto () {
    // sendPhoto(this.props.user, this.state.imageData);
    this.props.notImplemented();
  }

  getUIProperties () {
    const { imageData } = this.state;
    const { completeDeed, deed, locationPromise } = this.props;
    if (imageData) {
      // show picture
      return {
        buttonProps: {
          onClick: completeDeed.bind(null, { deed, imageData, locationPromise } ),
          text: 'Send picture as evidence >'
        },
        imageClass: '',
        instruction: 'Click/press the picture to try again',
        setupFn: this.showPhoto,
        videoClass: 'hidden'
      };
    } else {
      // show video
      return {
        buttonProps: null,
        imageClass: 'hidden',
        instruction: 'Click/press the video to take a picture',
        setupFn: this.startVideo,
        videoClass: ''
      };
    }
  }

  reset () {
    this.setState({ ...this.state, imageData: undefined });
  }

  render () {
    const { buttonProps, imageClass, instruction, setupFn, videoClass } = this.getUIProperties();
    const button = buttonProps ? (<Button {...buttonProps} />) : null;
    setupFn();
    return (
      <div className='page'>
        <Title text='Take a photo of your deed.' />
        <Text text={instruction} />
        <video ref={this.video} autoPlay onClick={this.captureVideo} className={videoClass} />
        <img ref={this.image} alt='what will be submitted' onClick={this.reset} className={imageClass} />
        <canvas ref={this.canvas} className='hidden' />
        {button}
      </div>
    );
  }
}

export default TakePhoto;
