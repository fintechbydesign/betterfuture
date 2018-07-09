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
  'alternateRender',
  'getNextRender',
  'renderWall',
  'renderStats',
  'setPopupContent',
  'updateState'
];


class WonderWall extends Component {
  constructor (props) {
    super(props);
    methods.forEach((method) => { this[method] = this[method].bind(this); });
    this.state = {
      admin: !!window.ADMIN_MODE,
      currentRender: 'renderWall',
      debug: false,
      latestNews: undefined,
      popupContent: undefined,
      renderDurations: {
        renderWall: 4 * 60 * 1000,
        renderStats: 30 * 1000,
      },
      showMenu: false,
      statsURL: 'https://s3-eu-west-1.amazonaws.com/deedit-smallscreen-dashboard/FullScreenMercuryViz.png',
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
      this.alternateRender();
    }
  }

  alternateRender () {
    const { currentRender, renderDurations, showMenu } = this.state;
    const nextRender = (showMenu) ? currentRender : this.getNextRender();
    const alternate = () => {
      this.updateState({currentRender: nextRender});
      this.alternateRender();
    };
    setTimeout( alternate, renderDurations[currentRender]);
  }

  getNextRender = () => {
    const { currentRender, renderDurations } = this.state;
    const keys = Object.keys(renderDurations);
    let pos = keys.indexOf(currentRender);
    pos = pos + 1;
    if (pos === keys.length) {
      pos = 0;
    }
    return keys[pos];
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

  renderStats () {
    const { statsURL } = this.state;
    return (
      <div className='Wonderwall_container'>
        <img alt='deedit stats' className='Wonderwall_stats' src={statsURL} />
      </div>
    )
  }

  renderWall () {
    const { addPhoto, addNews, addVideo, alternateRender, setPopupContent, state, updateState } = this;
    const { admin, debug, latestNews, showMenu, popupContent, renderDurations, statsURL, tiles, tileFilter } = state;
    const filteredTiles = tiles.filter(tileFilter);
    const numTiles = filteredTiles.length;
    const mappedTiles = filteredTiles.map((tile, index) => {
      const { deedId, src } = tile;
      const tileProps = {
        canPopup: popupContent && !showMenu,
        deedId,
        tile,
        isPopup: false,
        key: numTiles - index - 1,
        setPopupContent,
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
      alternateRender,
      debug,
      showMenu,
      popupVisible: !!popupContent,
      renderDurations,
      statsURL,
      updateState
    };

    const tickerProps = {
      latestNews
    };

    const debugProps = {
      addPhoto,
      addVideo,
      enable: debug,
      addNews
    };

    const popupProps = {
      content: popupContent,
      menuVisible: showMenu,
      setPopupContent
    };

    const background = (admin)
      ? null
      : (<img src='./images/wonderwall.png' alt='wonderwall background' className='WonderWall_background' />);

    const menu = (admin)
      ? null
      : (<Menu {...menuProps} />);

    return (
      <div className='Wonderwall_container'>
        {background}
        {mappedTiles}
        {menu}
        <Ticker {...tickerProps} />
        <Debug {...debugProps} />
        <Popup {...popupProps} />
      </div>
    );
  }

  render () {
    const { currentRender } = this.state;
    return this[currentRender]();
  }
}

export default WonderWall;
