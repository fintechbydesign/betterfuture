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
  'addTile',
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
      popupContent: undefined,
      showMenu: false,
      tiles: []
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
    const tile = {
      type: 'photo',
      ...photo
    };
    this.addTile(tile);
  }

  addVideo (video) {
    console.log('video received: ', video);
    const tile = {
      type: 'video',
      ...video
    };
    this.addTile(tile);
  }

  addTile (tile) {
    this.setState(prevState => ({
      ...prevState,
      tiles: [tile, ...prevState.tiles]
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

    const numTiles = this.state.tiles.length;
    const tiles = this.state.tiles.map((tile, index) => {
      const reverseIndex = numTiles - index - 1;
      let onClick;
      switch (tile.type) {
        case 'photo':
          onClick = canPopup ?
            null :
            this.setPopupContent.bind(null, (<Photo src={tile.src} />));
          return (<Photo src={tile.smallSrc} key={reverseIndex} onClick={onClick}/>);
        case 'video':
          onClick = canPopup ?
            null :
            this.setPopupContent.bind(null, (<Video src={tile.src} height='480' width='640' />));
          return (<Video src={tile.src} height='240' width='320' key={reverseIndex} onClick={onClick}/>);
        default:
          return null;
      }
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
        {tiles}
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
