// with thanks to https://www.html5rocks.com/en/tutorials/getusermedia/intro/

import React, { createRef, Component } from 'react';
import CompleteDeed from '../components/CompleteDeed'
import Text from '../components/Text.js';
import Title from '../components/Title.js';
import { loadS3 } from '../data/S3';
import './TakePhoto.css';

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
    loadS3();
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
    const { user } = this.props;
    const { current } = user.deeds;
    if (imageData) {
      // show picture
      return {
        completeDeedProps: {
          deed: current,
          imageData,
          navigateFns: this.props,
          text: 'Send picture as evidence >',
          user
        },
        imageClass: '',
        instruction: 'Click/press the picture to try again',
        setupFn: this.showPhoto,
        videoClass: 'TakePhoto-hide'
      };
    } else {
      // show video
      return {
        completeDeedProps: null,
        imageClass: 'TakePhoto-hide',
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
    const { completeDeedProps, imageClass, instruction, setupFn, videoClass } = this.getUIProperties();
    const completeDeed = completeDeedProps ? (<CompleteDeed {...completeDeedProps} />) : null;
    setupFn();
    return (
      <div>
        <Title text='Take a photo of your deed.' />
        <Text text={instruction} />
        <video ref={this.video} autoPlay onClick={this.captureVideo} className={videoClass} />
        <img ref={this.image} alt='what will be submitted' onClick={this.reset} className={imageClass} />
        <canvas ref={this.canvas} className='TakePhoto-hide' />
        {completeDeed}
      </div>
    );
  }
}

export default TakePhoto;
