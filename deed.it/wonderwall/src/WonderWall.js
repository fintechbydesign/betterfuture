import io from 'socket.io-client';
import React, { Component } from 'react';
import './WonderWall.css';

class WonderWall extends Component {
  constructor (props) {
    super(props);
    this.state = { photos: [] };
    const socket = io();
    socket.on('photo', this.addPhoto.bind(this));
  }

  addPhoto (photo) {
    console.log('photo received: ', photo);
    this.setState(prevState => ({
      ...prevState,
      photos: [photo, ...prevState.photos]
    }));
  }

  render () {
    const photos = this.state.photos.map(photo => (<img src={photo.src} alt='deed evidence' />));
    return (
      <div>
        <img src='wonderwall.png' alt='wonderwall background' className='WonderWall_background' />
        {photos}
      </div>
    );
  }
}

export default WonderWall;
