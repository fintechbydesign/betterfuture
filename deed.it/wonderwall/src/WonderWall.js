import io from 'socket.io-client';
import Photo from './Photo';
import React, { createRef, Component } from 'react';
import './WonderWall.css';

const debug = false;
const delay = () => new Promise((resolve) => setTimeout(resolve));

class WonderWall extends Component {
  constructor (props) {
    super(props);

    this.addPhoto = this.addPhoto.bind(this);
    this.replayPhotoEvent = this.replayPhotoEvent.bind(this);
    this.reportNews = this.reportNews.bind(this);
    this.resizeImage = this.resizeImage.bind(this);

    this.state = { photos: [] };

    this.canvas = createRef();
    this.image = createRef();

    const socketURL = debug ? 'https://localhost' : undefined;
    const socket = io(socketURL);
    socket.on('news', this.reportNews);
    socket.on('photo', this.addPhoto);
  }

  reportNews (news) {
    console.log('news received: ', news);
  }

  resizeImage (src, width, height) {
    const canvas = this.canvas.current;
    const img = this.image.current;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(img, 0, 0, width, height);
    return canvas.toDataURL('image/png');
  }

  async addPhoto (photo) {
    console.log('photo received: ', photo);
    if (debug) {
      localStorage.setItem('testPhoto', JSON.stringify(photo));
    }
    const img = this.image.current;
    img.src = photo.src;
    await delay(); // required to allow image to draw (invisibly!)
    photo.smallSrc = this.resizeImage(photo.src, 320, 240);
    this.setState(prevState => ({
      ...prevState,
      photos: [photo, ...prevState.photos]
    }));
  }

  replayPhotoEvent () {
    const photo = localStorage.getItem('testPhoto');
    if (photo) {
      this.addPhoto(JSON.parse(photo));
    } else {
      console.error('no test photo to replay')
    }
  }

  render () {
    const numPhotos = this.state.photos.length;
    const photos = this.state.photos.map((photo, index) => (<Photo src={photo.smallSrc} key={numPhotos - index - 1} />));
    const debugElements = debug ? (<button onClick={this.replayPhotoEvent}>Test Photo</button>) : null;
    return (
      <div>
        <img src='wonderwall.png' alt='wonderwall background' className='WonderWall_background' />
        {photos}
        {debugElements}
        <img ref={this.image} alt="for resizing" className='WonderWall_hide'/>
        <canvas ref={this.canvas} className='WonderWall_hide' />
      </div>
    );
  }
}

export default WonderWall;
