import io from 'socket.io-client';
import Photo from './Photo';
import React, { createRef, Component } from 'react';
import Ticker from './Ticker';
import './WonderWall.css';

const fakeNews = [
  'Man bites dog',
  'Ticker tapes suck',
  'She sells sea shells on the sea shore',
  'Round the rugged rock, the ragged rascal ran',
  'Six sick sheiks, sitting stiching sheets'
];

const delay = () => new Promise((resolve) => setTimeout(resolve));
const randomInt = (max) => Math.floor(Math.random() * (max + 1));

const methods = [
  'addPhoto',
  'generateFakeNews',
  'receiveNews',
  'renderDebugElements',
  'renderMenu',
  'replayPhotoEvent',
  'reportNews',
  'resizeImage',
  'toggleDebug',
  'toggleMenu'
];

class WonderWall extends Component {
  constructor (props) {
    super(props);

    methods.forEach((method) => this[method] = this[method].bind(this));

    this.state = {
      debug: false,
      photos: [],
      newNews: [],
      reportedNews: [],
      showMenu: false
    };

    this.canvas = createRef();
    this.image = createRef();

    const socketURL = this.state.debug ? 'https://localhost' : undefined;
    const socket = io(socketURL);
    socket.on('news', this.receiveNews);
    socket.on('photo', this.addPhoto);

    setTimeout(this.reportNews, 15 * 1000);
  }

  generateFakeNews () {
    const randomIndex = randomInt(fakeNews.length -1);
    this.receiveNews(fakeNews[randomIndex]);
  }

  receiveNews (news) {
    console.log('news received: ', news);
    this.state.newNews.push(news);
  }

  reportNews () {
    const maxItems = 5;
    const newItems = this.state.newNews.length;
    if (newItems > 0) {
      if (newItems > maxItems) {
        this.setState({
          ...this.state,
          reportedNews: this.state.newNews.splice(0, maxItems)
        });
      } else {
        this.setState({
          ...this.state,
          reportedNews: [...this.state.newNews, ...this.state.reportedNews].slice(0, maxItems),
          newNews: []
        });
      }
    }
    setTimeout(this.reportNews, 15 * 1000);
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
    if (this.state.debug) {
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

  renderDebugElements () {
    if (this.state.debug ) {
      return (
        <div>
          <button onClick={this.replayPhotoEvent}>Test Photo</button>
          <button onClick={this.generateFakeNews}>Test News</button>
        </div>
      );
    } else {
      return null;
    }
  }

  toggleDebug () {
    this.setState(prevState => ({
      ...prevState,
      debug: !prevState.debug,
      showMenu: false
    }));
  }

  toggleMenu () {
    this.setState(prevState => ({
      ...prevState,
      showMenu: !prevState.showMenu
    }));
  }

  renderMenu () {
    if (this.state.showMenu) {
      return (
        <div className='WonderWall_menu'>
          <h3>WonderWall Options</h3>
          <input type='checkbox' id='debug' onClick={this.toggleDebug} checked={this.state.debug}/>
          <label for="debug">enable debug elements</label>
        </div>);
    } else {
      return (<img src='menu-icon.png' alt='menu' className='WonderWall_menu_icon' onClick={this.toggleMenu}/>);
    }
  }

  render () {
    const numPhotos = this.state.photos.length;
    const photos = this.state.photos.map((photo, index) => (<Photo src={photo.smallSrc} key={numPhotos - index - 1} />));
    const debugElements = this.renderDebugElements();
    const menuElements = this.renderMenu();
    return (
      <div>
        <img src='wonderwall.png' alt='wonderwall background' className='WonderWall_background' />
        {photos}
        <Ticker items={this.state.reportedNews} />
        {debugElements}
        {menuElements}
        <img ref={this.image} alt="for resizing" className='WonderWall_hide'/>
        <canvas ref={this.canvas} className='WonderWall_hide' />
      </div>
    );
  }
}

export default WonderWall;
