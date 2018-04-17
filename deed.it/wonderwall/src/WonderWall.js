/* global localStorage */

import io from 'socket.io-client';
import React, { createRef, Component } from 'react';
import Badge from './Badge';
import Debug from './Debug';
import Menu from './Menu';
import Photo from './Photo';
import Popup from './Popup';
import Ticker from './Ticker';
import Video from './Video';
import './WonderWall.css';

const delay = () => new Promise((resolve) => setTimeout(resolve));

const methods = [
  'addBadge',
  'addNews',
  'addPhoto',
  'addTile',
  'addUser',
  'addUsername',
  'addVideo',
  'resizeImage',
  'setPopupContent',
  'updateState'
];

const badgeMethods = {
  'addGoldBadge': './images/gold-badge.png',
  'addSilverBadge': './images/silver-badge.png',
  'addBronzeBadge': './images/bronze-badge.png'
};

class WonderWall extends Component {
  constructor (props) {
    super(props);

    methods.forEach((method) => { this[method] = this[method].bind(this); });
    Object.entries(badgeMethods).forEach(([method, src]) => { this[method] = this.addBadge.bind(this, src); });

    this.state = {
      debug: true,
      latestNews: undefined,
      popupContent: undefined,
      showMenu: false,
      tiles: [],
      tileFilter: () => true,
      usernames: new Set()
    };

    this.canvas = createRef();
    this.image = createRef();

    const socketURL = this.state.debug ? 'https://localhost' : undefined;
    const socket = io(socketURL);
    socket.on('news', this.addNews);
    socket.on('photo', this.addPhoto);
    socket.on('user', this.addUser);
    socket.on('video', this.addVideo);
  }

  addBadge (src, username) {
    const tile = {
      src,
      type: 'badge',
      username
    };
    this.addTile(tile);
  }

  async addPhoto (photo) {
    console.log('photo received: ', photo);
    const img = this.image.current;
    img.src = photo.src;
    await delay(); // required to allow image to draw (invisibly!)
    photo.smallSrc = this.resizeImage(photo.src, 320, 240);
    const tile = {
      type: 'photo',
      ...photo
    };
    if (this.state.debug) {
      localStorage.setItem('testPhotoTile', JSON.stringify(photo));
    }
    this.addTile(tile);
  }

  addUser (user) {
    this.addNews(`Thankyou ${user.username} for registering`);
  }

  addUsername (username) {
    if (!this.state.usernames.has(username)) {
      this.state.usernames.add(username);
      this.addNews(`Congratulations ${username} on completing your first deed`);
      this.addBronzeBadge(username);
    }
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
    this.addUsername(tile.username);
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

  setPopupContent (content) {
    this.setState({
      ...this.state,
      popupContent: content
    });
  }

  updateState (newProps) {
    this.setState({
      ...this.state,
      ...newProps
    });
  }

  render () {
    const filteredTiles = this.state.tiles.filter(this.state.tileFilter);
    const numTiles = filteredTiles.length;
    const tiles = filteredTiles.map((tile, index) => {
      const tileProps = {
        canPopup: this.state.popupContent && !this.state.showMenu,
        isPopup: false,
        key: numTiles - index - 1,
        setPopupContent: this.setPopupContent,
        src: tile.src
      };
      switch (tile.type) {
        case 'photo':
          tileProps.smallSrc = tile.smallSrc;
          return (<Photo {...tileProps} />);
        case 'video':
          return (<Video {...tileProps} />);
        case 'badge':
          return (<Badge {...tileProps} />);
        default:
          return null;
      }
    });

    const menuProps = {
      debug: this.state.debug,
      showMenu: this.state.showMenu,
      popupVisible: !!this.state.popupContent,
      updateState: this.updateState
    };

    const tickerProps = {
      latestNews: this.state.latestNews
    };

    const debugProps = {
      addPhoto: this.addPhoto,
      addVideo: this.addVideo,
      enable: this.state.debug,
      addNews: this.addNews
    };
    Object.keys(badgeMethods).forEach(method => { debugProps[method] = this[method]; });

    const popupProps = {
      content: this.state.popupContent,
      menuVisible: this.state.showMenu,
      setPopupContent: this.setPopupContent
    };

    return (
      <div>
        <img src='./images/wonderwall.png' alt='wonderwall background' className='WonderWall_background' />
        {tiles}
        <Menu {...menuProps} />
        <Ticker {...tickerProps} />
        <Debug {...debugProps} />
        <Popup {...popupProps} />
        <img ref={this.image} alt='for resizing' className='WonderWall_hide' />
        <canvas ref={this.canvas} className='WonderWall_hide' />
      </div>
    );
  }
}

export default WonderWall;
