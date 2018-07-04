/* global Image */

// with thanks to https://www.html5rocks.com/en/tutorials/getusermedia/intro/

import React, { createRef, Component } from 'react';
import Button from '../components/Button';
import ImageComponent from '../components/Image';
import Text from '../components/Text.js';
import Title from '../components/Title.js';
import { initS3 } from '../data/S3';
import temp from '../images/nav-aboutus.svg';
import './TakePhoto.css';

const methods = [
    'captureVideo',
    'renderToolbar',
    'reset',
    'rotateImage',
    'setState',
    'showPhoto',
    'startVideo',
    'storeImage'
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

  reset () {
    this.setState({ ...this.state, imageData: undefined });
  }

  renderToolbar () {
    const { reset, rotateImage } = this;
    return (
      <div>
        <Text className='TakePhoto-toolbar-title' text='Happy with your snap?' />
        <div className='flexContainerRow TakePhoto-toolbar'>
          <div className='TakePhoto-toolbar-item' onClick={reset} >
            <ImageComponent src={temp} className='TakePhoto-toolbar-image' />
            <div>Change</div>
          </div>
          <div className='TakePhoto-toolbar-item' onClick={rotateImage} >
            <ImageComponent src={temp} className='TakePhoto-toolbar-image' />
            <div>Rotate</div>
          </div>
      </div>
      </div>
    );
  }

  render () {
    const { captureVideo, props, renderToolbar, references, reset, showPhoto, startVideo, state } = this;
    const { canvas, image, video } = references;
    const { completeDeed, deed, locationPromise } = props;
    const { imageData } = state;

    const videoContainerProps = {
      className: (imageData) ? 'hidden' : 'TakePhoto-video-container',
      onClick: captureVideo
    };

    const imageProps = {
      className: (imageData) ? 'TakePhoto-image' : 'hidden',
      onClick: reset,
      ref: image
    };

    const toolbar = (imageData) ? renderToolbar() : null;

    const buttonProps = {
      className: (imageData) ? '' : 'hidden',
      onClick: completeDeed.bind(null, { deed, imageData, locationPromise }),
      text: 'Send Snap'
    };

    if (imageData) {
      showPhoto();
    } else {
      startVideo();
    }

    return (
      <div className='page'>
        <Title text='Take a photo of your deed.' />
        <div {...videoContainerProps} >
          <video autoPlay className='TakePhoto-image' ref={video} />
          <Text className='TakePhoto-video-instruction' text='Touch to take a picture' />
        </div>
        <img  alt='what will be submitted' {...imageProps} />
        {toolbar}
        <canvas ref={canvas} className='hidden' />
        <Button {...buttonProps} />
      </div>
    );
  }
}

export default TakePhoto;
