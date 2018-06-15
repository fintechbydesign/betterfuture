import React, { createRef, Component } from 'react';
import Button from '../components/Button';
import Title from '../components/Title';
import { initS3 } from '../data/S3';
import './UploadPhoto.css';

const methods = ['fileSelected', 'renderInput', 'sendPhoto', 'showPhoto', 'storeImage', 'getUIProperties'];

class UploadPhoto extends Component {

  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = {};
    this.canvas = createRef();
    this.image = createRef();
  }

  componentDidMount () {
    initS3();
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
    const canvas = this.canvas.current;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(src, 0, 0, width, height);
    const imageData = canvas.toDataURL('image/png');
    this.setState({...this.state, imageData });
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
    const { completeDeed, locationPromise, user } = this.props;
    const { deed } = user.selected;
    if (imageData) {
      // show picture
      return {
        buttonProps: {
          onClick: completeDeed.bind(null, { deed, imageData, locationPromise } ),
          text: 'Send picture as evidence >'
        },
        imageClass: 'flexFixedSize UploadPhoto-image',
        inputText: 'Change the picture',
        setupFn: this.showPhoto
      };
    } else {
      // show select button
      return {
        buttonProps: null,
        imageClass: 'hidden',
        inputText: 'Select a picture',
        setupFn: () => null
      };
    }
  }

  renderInput (text) {
    const labelProps = {
      htmlFor: 'choose',
      className: 'Component-default Button-default'
    };
    const inputProps = {
      accept: 'image/*',
      className: 'UploadPhoto-hidden',
      id: 'choose',
      onChange: this.fileSelected,
      type: 'file'
    };
    return (
      <div className={'flexContainerColumn'}>
        <label {...labelProps}>{text}</label>
        <input {...inputProps} />
      </div>
    );
  }

  render () {
    const { buttonProps, imageClass, inputText, setupFn } = this.getUIProperties();
    const button = buttonProps ? (<Button {...buttonProps} />) : null;
    setupFn();
    return (
      <div className='page'>
        <Title text='Upload a photo of your deed.' />
        <img ref={this.image} alt='what will be submitted' className={imageClass} />
        <canvas ref={this.canvas} className='hidden' />
        {this.renderInput(inputText)}
        {button}
      </div>
    );
  }
}

export default UploadPhoto;
