import io from 'socket.io-client';
import React, { createRef, Component } from 'react';
import Debug from './Debug';
import Menu from './Menu';
import Photo from './Photo';
import Popup from './Popup';
import Ticker from './Ticker';
import Video from './Video';
import './WonderWall.css';

const delay = () => new Promise((resolve) => setTimeout(resolve));

const methods = [
  'addNews',
  'addPhoto',
  'addVideo',
  'resizeImage',
  'setPopupContent',
  'toggleDebug',
  'toggleMenu'
];

class WonderWall extends Component {
  constructor (props) {
    super(props);

    methods.forEach((method) => this[method] = this[method].bind(this));

    this.state = {
      debug: true,
      latestNews: undefined,
      photos: [],
      popupContent: undefined,
      showMenu: false,
      videos: []
    };

    this.canvas = createRef();
    this.image = createRef();

    const socketURL = this.state.debug ? 'https://localhost' : undefined;
    const socket = io(socketURL);
    socket.on('news', this.addNews);
    socket.on('photo', this.addPhoto);
    socket.on('video', this.addVideo);
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

  addVideo (video) {
    console.log('video received: ', video);
    this.setState(prevState => ({
      ...prevState,
      videos: [video, ...prevState.videos]
    }));
  }

  addNews (news) {
    console.log('news received: ', news);
    this.setState({
      ...this.state,
      latestNews: news
    });
  }

  resizeImage (src, width, height) {
    const canvas = this.canvas.current;
    const img = this.image.current;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(img, 0, 0, width, height);
    return canvas.toDataURL('image/png');
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

  setPopupContent (content) {
    this.setState({
      ...this.state,
      popupContent: content
    });
  }

  render () {
    const canPopup = this.state.popupContent && !this.state.showMenu;

    const numPhotos = this.state.photos.length;
    const photos = this.state.photos.map((photo, index) => {
      const onClick = canPopup ?
        null :
        this.setPopupContent.bind(null, (<Photo src={photo.src} />));
      const reverseIndex = numPhotos - index - 1;
      return (<Photo src={photo.smallSrc} key={reverseIndex} onClick={onClick}/>)
    });

    const numVideos = this.state.videos.length;
    const videos = this.state.videos.map((video, index) => {
      const onClick = canPopup ?
        null :
        this.setPopupContent.bind(null, (<Video src={video.src} height='480' width='640' />));
      const reverseIndex = numVideos - index - 1;
      return (<Video src={video.src} height='240' width='320' key={reverseIndex} onClick={onClick}/>)
    });
    
    const menuProps = {
      debugEnabled: this.state.debug,
      enable: this.state.showMenu,
      popupVisible: !!this.state.popupContent,
      toggleDebug: this.toggleDebug,
      toggleMenu: this.toggleMenu
    };

    const tickerProps = {
      latestNews: this.state.latestNews
    };

    const debugProps = {
      addPhoto: this.addPhoto,
      addVideo: this.addVideo,
      enable: this.state.debug,
      addNews: this.addNews,
    };
    
    const popupProps = {
      content: this.state.popupContent,
      menuVisible: this.state.showMenu,
      setPopupContent: this.setPopupContent
    }

    return (
      <div>
        <img src='wonderwall.png' alt='wonderwall background' className='WonderWall_background' />
        {photos}
        {videos}
        <Menu {...menuProps} />
        <Ticker {...tickerProps} />
        <Debug {...debugProps} />
        <Popup {...popupProps} />
        <img ref={this.image} alt="for resizing" className='WonderWall_hide'/>
        <canvas ref={this.canvas} className='WonderWall_hide' />
      </div>
    );
  }
}

export default WonderWall;
