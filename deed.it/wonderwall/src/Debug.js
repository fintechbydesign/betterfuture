import React, { Component } from 'react';

const fakeNews = [
  'Man bites dog',
  'Ticker tapes suck',
  'She sells sea shells on the sea shore',
  'Round the rugged rock, the ragged rascal ran',
  'Six sick sheiks, sitting stiching sheets'
];

const methods = [
  'addTestVideo',
  'generateFakeNews',
  'replayPhotoEvent'
];

const randomInt = (max) => Math.floor(Math.random() * (max + 1));

class Debug extends Component {

  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
  }

  addTestVideo () {
    this.props.addVideo({
      src: '/videos/big_buck_bunny.mp4'
    });
  }

  generateFakeNews () {
    const randomIndex = randomInt(fakeNews.length -1);
    this.props.addNews(fakeNews[randomIndex]);
  }

  replayPhotoEvent () {
    const photo = localStorage.getItem('testPhoto');
    if (photo) {
      this.props.addPhoto(JSON.parse(photo));
    } else {
      console.error('no test photo to replay')
    }
  }

  render () {
    if (this.props.enable) {
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
}

export default Debug;