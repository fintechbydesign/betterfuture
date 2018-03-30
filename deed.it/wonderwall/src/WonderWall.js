import io from 'socket.io-client';
import React, { createRef, Component } from 'react';
import './WonderWall.css';

class WonderWall extends Component {
  constructor (props) {
    super(props);
    this.state = { photos: [] };
    this.canvas = createRef();
    this.image = createRef();
    this.resizeImage = this.resizeImage.bind(this);
    const socket = io();
    socket.on('news', this.reportNews.bind(this));
    socket.on('photo', this.addPhoto.bind(this));
  }

  reportNews (news) {
    console.log('news received: ', news);
  }

  resizeImage (src, width, height) {
    const canvas = this.canvas.current;
    const image = this.image.current;
    image.src = src;
    canvas.width = image.width /2;
    canvas.height = image.height / 2;
    canvas.getContext('2d').drawImage(image, 0, 0, width, height);
    return canvas.toDataURL('image/png');
  }

  addPhoto (photo) {
    console.log('photo received: ', photo);
    photo.smallSrc = this.resizeImage(photo.src, 320, 240);
    this.setState(prevState => ({
      ...prevState,
      photos: [photo, ...prevState.photos]
    }));
  }

  render () {
    const photos = this.state.photos.map(photo => (<img src={photo.smallSrc} alt='deed evidence' />));
    return (
      <div>
        <img src='wonderwall.png' alt='wonderwall background' className='WonderWall_background' />
        {photos}
        <image ref={this.image} className='WonderWall_hide' />
        <canvas ref={this.canvas} className='WonderWall_hide' />
      </div>
    );
  }
}

export default WonderWall;
