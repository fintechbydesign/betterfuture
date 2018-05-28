/* global localStorage */

import React, { Component } from 'react';
import Badge from './Badge';
import Debug from './Debug';
import Menu from './Menu';
import Photo from './Photo';
import startPolling from './poller';
import Popup from './Popup';
import Ticker from './Ticker';
import Video from './Video';
import './WonderWall.css';

const methods = [
  'addBadge',
  'addNews',
  'addPhoto',
  'addTile',
  'addVideo',
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

  addPhoto (photo) {
    console.log('photo received: ', photo);
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
      </div>
    );
  }
}

export default WonderWall;
