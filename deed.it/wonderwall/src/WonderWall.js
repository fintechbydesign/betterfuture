/* global localStorage */

import React, { createRef, Component } from 'react';
import Badge from './Badge';
import Debug from './Debug';
import Menu from './Menu';
import Photo from './Photo';
import startPolling from './poller';
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
  'addVideo',
  'resizeImage',
  'setPopupContent',
  'updateState'
];

class WonderWall extends Component {
  constructor (props) {
    super(props);

    methods.forEach((method) => { this[method] = this[method].bind(this); });

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
  }

  componentDidMount () {
    startPolling({
      'badge': this.addBadge,
      'news': this.addNews,
      'photo': this.addPhoto,
      'video': this.addVideo
    });
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
