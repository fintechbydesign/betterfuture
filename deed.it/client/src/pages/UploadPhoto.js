import React, { createRef, Component } from 'react';
import Button from '../components/Button';
import ImageComponent from '../components/Image';
import Title from '../components/Title';
import { initS3 } from '../data/S3';
import temp from '../images/nav-aboutus.svg';
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
    methods.forEach((method) => this[method] = this[method].bind(this));
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
    this.setState({...this.state, imageData });
  }

  rotateImage (angle) {
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
      context.save();
      context.translate(canvas.width, canvas.height / canvas.width);
      context.rotate(angle);
      context.drawImage(image, 0, 0);
      context.restore();
      const imageData = canvas.toDataURL('image/png');
      setState({...state, imageData});
    }
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
      <div className='flexContainerRow UploadPhoto-toolbar'>
        <div className='UploadPhoto-toolbar-item' onClick={rotateImage.bind(null, (3 * Math.PI / 2))} >
          <ImageComponent src={temp} className='UploadPhoto-toolbar-image'/>
          <div>Rotate left</div>
        </div>
        <div className='UploadPhoto-toolbar-item'>
          <ImageComponent src={temp} className='UploadPhoto-toolbar-image'/>
          {renderInput('Change picture')}
        </div>
        <div className='UploadPhoto-toolbar-item' onClick={rotateImage.bind(null, (Math.PI / 2))} >
          <ImageComponent src={temp} className='UploadPhoto-toolbar-image'/>
          <div>Rotate right</div>
        </div>
      </div>
    );
  };

  render () {
    const { props, renderInput, renderToolbar, references, showPhoto, state } = this;
    const { completeDeed, deed, locationPromise } = props;
    const { canvas, image } = references;
    const { imageData } = state;

    const imageProps = {
      className: (imageData) ? 'flexFixedSize UploadPhoto-image' : 'hidden',
      ref: image,
    };
    const imageControls = (imageData)
      ? renderToolbar()
      : renderInput('Select a picture', 'Component-default Button-default');
    const buttonProps = {
      className: (imageData) ? '' : 'hidden',
      onClick: completeDeed.bind(null, { deed, imageData, locationPromise } ),
      text: 'Send picture as evidence'
    }

    if (imageData) {
      showPhoto();
    }

    return (
      <div className='page'>
        <Title text='Upload a photo of your deed' />
        <canvas ref={canvas} className='hidden' />
        <div className='UploadPhoto-container'>
          <img alt='what will be submitted' {...imageProps} />
          {imageControls}
        </div>
        <Button {...buttonProps} />
      </div>
    );
  }
}

export default UploadPhoto;
