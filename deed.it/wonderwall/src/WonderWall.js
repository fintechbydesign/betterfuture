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
  'renderPopup',
  'replayPhotoEvent',
  'reportNews',
  'resizeImage',
  'setPopupContent',
  'addTestVideo',
  'toggleDebug',
  'toggleMenu'
];

class WonderWall extends Component {
  constructor (props) {
    super(props);

    methods.forEach((method) => this[method] = this[method].bind(this));

    this.state = {
      debug: true,
      newNews: [],
      photos: [],
      popupContent: undefined,
      reportedNews: [],
      showMenu: false,
      videos: []
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

  addTestVideo () {
    this.setState(prevState => ({
      ...prevState,
      videos: [{}, ...prevState.videos]
    }));
  }

  renderDebugElements () {
    if (this.state.debug ) {
      return (
        <div>
          <button onClick={this.replayPhotoEvent}>Test Photo</button>
          <button onClick={this.generateFakeNews}>Test News</button>
          <button onClick={this.addTestVideo}>Test Video</button>
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
          <label htmlFor="debug">enable debug elements</label>
        </div>);
    } else if (this.state.popupContent) {
      return null;
    } else {
      return (<img src='menu-icon.png' alt='menu' className='WonderWall_menu_icon' onClick={this.toggleMenu}/>);
    }
  }

  setPopupContent (content) {
    this.setState({
      ...this.state,
      popupContent: content
    });
  }

  renderPopup () {
    if (this.state.popupContent && !this.state.showMenu) {
      const closePopup = this.setPopupContent.bind(null, null);
      return (<div className='WonderWall_popup' onClick={closePopup}>{this.state.popupContent}</div>)
    } else {
      return null;
    }
  }

  render () {
    const numPhotos = this.state.photos.length;
    const canPopup = this.state.popupContent && !this.state.showMenu;
    const photos = this.state.photos.map((photo, index) => {
      const onClick = canPopup ? null : this.setPopupContent.bind(null, (<Photo src={photo.src} />));
      const reverseIndex = numPhotos - index - 1;
      return (<Photo src={photo.smallSrc} key={reverseIndex} onClick={onClick}/>)
    });
    const videos = this.state.videos.map((video, index) => {
      return (<video src='/videos/big_buck_bunny.mp4' autoPlay loop height='240' width='320' key={index}/>)
    });
    const debugElements = this.renderDebugElements();
    const menuElements = this.renderMenu();
    const popupElements = this.renderPopup();
    return (
      <div>
        <img src='wonderwall.png' alt='wonderwall background' className='WonderWall_background' />
        {photos}
        {videos}
        <Ticker items={this.state.reportedNews} />
        {debugElements}
        {menuElements}
        {popupElements}
        <img ref={this.image} alt="for resizing" className='WonderWall_hide'/>
        <canvas ref={this.canvas} className='WonderWall_hide' />
      </div>
    );
  }
}

export default WonderWall;
