/* global localStorage */

import React, { Component } from 'react';
import Admin from '../tiles/Admin';
import Badge from '../tiles/Badge';
import Debug from '../components/Debug';
import Menu from '../components/Menu';
import Photo from '../tiles/Photo';
import Popup from '../components/Popup';
import Ticker from '../components/Ticker';
import Video from '../tiles/Video';
import startPolling from '../data/poller';
import { fetchUnapprovedEvidence } from "../data/approvals";
import './WonderWall.css';

const methods = [
  'addAdmin',
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
      admin: !!window.ADMIN_MODE,
      debug: false,
      latestNews: undefined,
      popupContent: undefined,
      showMenu: false,
      tiles: [],
      tileFilter: () => true,
      usernames: new Set()
    };
  }

  componentDidMount () {
    const callbackEvents = {
      'admin': this.addAdmin,
      'badge': this.addBadge,
      'news': this.addNews,
      'photo': this.addPhoto,
      'video': this.addVideo
    };
    if (this.state.admin) {
      this.addNews({src: 'IN ADMIN MODE'});
      fetchUnapprovedEvidence(callbackEvents);
    } else {
      startPolling(callbackEvents);
    }
  }

  addAdmin (photo) {
    const tile = {
      ...photo,
      type: 'admin'
    };
    this.addTile(tile);
  }

  addBadge (src, username) {
    const tile = {
        ...src,
      type: 'badge',
      username
    };
    this.addTile(tile);
  }

  addPhoto (photo) {
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
    const { admin, debug, latestNews, showMenu, popupContent, tiles, tileFilter } = this.state;
    const filteredTiles = tiles.filter(tileFilter);
    const numTiles = filteredTiles.length;
    const mappedTiles = filteredTiles.map((tile, index) => {
      const { deedId, src } = tile;
      const tileProps = {
        canPopup: popupContent && !showMenu,
        deedId,
        isPopup: false,
        key: numTiles - index - 1,
        setPopupContent: this.setPopupContent,
        src
      };
      switch (tile.type) {
        case 'photo':
          return (<Photo {...tileProps} />);
        case 'video':
          return (<Video {...tileProps} />);
        case 'badge':
          return (<Badge {...tileProps} />);
        case 'admin':
          return (<Admin {...tileProps} />);
        default:
          return null;
      }
    });

    const menuProps = {
      debug,
      showMenu,
      popupVisible: !!popupContent,
      updateState: this.updateState
    };

    const tickerProps = {
      latestNews
    };

    const debugProps = {
      addPhoto: this.addPhoto,
      addVideo: this.addVideo,
      enable: debug,
      addNews: this.addNews
    };

    const popupProps = {
      content: popupContent,
      menuVisible: showMenu,
      setPopupContent: this.setPopupContent
    };

    const background = (admin)
      ? null
      : (<img src='./images/wonderwall.png' alt='wonderwall background' className='WonderWall_background' />);

    const menu = (admin)
      ? null
      : (<Menu {...menuProps} />);

    return (
      <div>
        {background}
        {mappedTiles}
        {menu}
        <Ticker {...tickerProps} />
        <Debug {...debugProps} />
        <Popup {...popupProps} />
      </div>
    );
  }
}

export default WonderWall;
