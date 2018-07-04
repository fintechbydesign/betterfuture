/* global Image */

// with thanks to https://www.html5rocks.com/en/tutorials/getusermedia/intro/

import React, { createRef, Component } from 'react';
import Button from '../components/Button';
import Text from '../components/Text.js';
import Title from '../components/Title.js';
import { initS3 } from '../data/S3';
import './TakePhoto.css';

const methods = [
    'captureVideo',
    'reset',
    'rotateImage',
    'setState',
    'showPhoto',
    'startVideo',
    'storeImage',
    'getUIProperties'
];

class TakePhoto extends Component {
  constructor (props) {
    super(props);
    methods.forEach((method) => { this[method] = this[method].bind(this); });
    this.state = {};
    this.references = {
      canvas: createRef(),
      image: createRef(),
      video: createRef()
    };
  }

  componentDidMount () {
    initS3();
  }

  startVideo () {
    const constraints = { video: true };
    const handleSuccess = (stream) => { this.references.video.current.srcObject = stream; };
    const handleError = (error) => console.error(error);
    navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
  }

  storeImage (src, width, height) {
    const canvas = this.references.canvas.current;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(src, 0, 0, width, height);
    const imageData = canvas.toDataURL('image/png');
    this.setState({ ...this.state, imageData });
  }

  rotateImage () {
    const { references, setState, state } = this;
    const canvas = references.canvas.current;
    const { height, width } = canvas;
    const context = canvas.getContext('2d');
    context.imageSmoothingEnabled = false;

    const image = new Image();
    image.src = canvas.toDataURL();

    image.onload = function () {
      canvas.width = height;
      canvas.height = width;
      context.translate(canvas.width, canvas.height / canvas.width);
      context.rotate(Math.PI / 2);
      context.drawImage(image, 0, 0);
      const imageData = canvas.toDataURL('image/png');
      setState({...state, imageData});
    };
  }

  captureVideo () {
    const video = this.references.video.current;
    const { videoWidth, videoHeight } = video;
    this.storeImage(video, videoWidth, videoHeight);
  }

  showPhoto () {
    this.references.image.current.src = this.state.imageData;
  }

  getUIProperties () {
    const { imageData } = this.state;
    const { completeDeed, deed, locationPromise } = this.props;
    if (imageData) {
      // show picture
      return {
        buttonProps: {
          onClick: completeDeed.bind(null, { deed, imageData, locationPromise }),
          text: 'Send picture as evidence'
        },
        imageClass: 'TakePhoto-image',
        instruction: [
          'Now you can:',
          (<ul key='rotate'>
            <li>
              Click the picture to try again
            </li>
            <li>
              Click
              <a onClick={this.rotateImage}> here </a>
              to rotate the image
            </li>
          </ul>)
        ],
        setupFn: this.showPhoto,
        videoClass: 'hidden'
      };
    } else {
      // show video
      return {
        buttonProps: null,
        imageClass: 'hidden',
        instruction: ['Click/press the video to take a picture'],
        setupFn: this.startVideo,
        videoClass: ''
      };
    }
  }

  reset () {
    this.setState({ ...this.state, imageData: undefined });
  }

  render () {
    const { references } = this;
    const { canvas, image, video } = references;
    const { buttonProps, imageClass, instruction, setupFn, videoClass } = this.getUIProperties();
    const button = buttonProps ? (<Button {...buttonProps} />) : null;
    setupFn();
    return (
      <div className='page'>
        <Title text='Take a photo of your deed.' />
        <Text contents={instruction} />
        <video ref={video} autoPlay onClick={this.captureVideo} className={videoClass} />
        <img ref={image} alt='what will be submitted' onClick={this.reset} className={imageClass} />
        <canvas ref={canvas} className='hidden' />
        {button}
      </div>
    );
  }
}

export default TakePhoto;
