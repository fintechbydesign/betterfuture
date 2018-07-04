/* global Image */

import React, { createRef, Component } from 'react';
import Button from '../components/Button';
import ImageComponent from '../components/Image';
import Text from '../components/Text.js';
import Title from '../components/Title';
import { initS3 } from '../data/S3';
import changeIcon from '../images/newphoto-icon.svg';
import rotateIcon from '../images/rotate-icon.svg';
import './UploadPhoto.css';

const methods = [
  'autoOpenFileDialog',
  'fileSelected',
  'renderInput',
  'renderToolbar',
  'rotateImage',
  'setState',
  'showPhoto',
  'storeImage'
];

class UploadPhoto extends Component {
  constructor (props) {
    super(props);
    methods.forEach((method) => { this[method] = this[method].bind(this); });
    this.state = {};
    this.references = {
      canvas: createRef(),
      image: createRef(),
      input: createRef()
    };
  }

  componentDidMount () {
    this.autoOpenFileDialog();
    initS3();
  }

  autoOpenFileDialog () {
    // thanks to https://github.com/alnorris/file-dialog/blob/master/index.js
    const evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    this.references.input.current.dispatchEvent(evt);
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
      };
    }
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
    const { references, state, setState } = this;
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

  showPhoto () {
    this.references.image.current.src = this.state.imageData;
  }

  renderInput (text, labelClass) {
    const { fileSelected, references } = this;
    const labelProps = {
      htmlFor: 'choose',
      className: labelClass
    };
    const inputProps = {
      accept: 'image/*',
      className: 'hidden',
      id: 'choose',
      onChange: fileSelected,
      ref: references.input,
      type: 'file'
    };
    return (
      <div className={'flexContainerColumn'}>
        <label {...labelProps}>{text}</label>
        <input {...inputProps} />
      </div>
    );
  }

  renderToolbar () {
    const { renderInput, rotateImage } = this;
    return (
      <div>
        <Text className='UploadPhoto-toolbar-title' text='Happy with your snap?' />
        <div className='flexContainerRow UploadPhoto-toolbar'>
          <div className='UploadPhoto-toolbar-item' onClick={rotateImage} >
            <ImageComponent src={rotateIcon} className='UploadPhoto-toolbar-image' />
            <div>Rotate</div>
          </div>
          <div className='UploadPhoto-toolbar-item'>
            <ImageComponent src={changeIcon} className='UploadPhoto-toolbar-image' />
            {renderInput('Change')}
          </div>
        </div>
      </div>
    );
  }

  render () {
    const { props, renderInput, renderToolbar, references, showPhoto, state } = this;
    const { completeDeed, deed, locationPromise } = props;
    const { canvas, image } = references;
    const { imageData } = state;

    const imageProps = {
      className: (imageData) ? 'flexFixedSize UploadPhoto-image' : 'hidden',
      ref: image
    };
    const imageControls = (imageData)
      ? renderToolbar()
      : renderInput('Select a picture', 'Component-default Button-default');
    const buttonProps = {
      className: (imageData) ? '' : 'hidden',
      onClick: completeDeed.bind(null, { deed, imageData, locationPromise }),
      text: 'Send Snap'
    };

    if (imageData) {
      showPhoto();
    }

    return (
      <div className='page'>
        <Title text='Upload a photo of your deed' />
        <canvas ref={canvas} className='hidden' />
        <img alt='what will be submitted' {...imageProps} />
        {imageControls}
        <Button {...buttonProps} />
      </div>
    );
  }
}

export default UploadPhoto;
