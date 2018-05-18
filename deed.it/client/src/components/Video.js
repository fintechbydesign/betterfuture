import React, { Component } from 'react';
import './Video.css';

class Video extends Component {

  constructor (props) {
    super(props);
    this.state = {
      src: props.src,
      height: props.height || '240',
      width: props.width || '320',
      instructionVisible: true
    }
  }

  render () {

    let mediaPlayer;
    let instructionClassName = 'Video-child Video-instruction';
    if (!this.state.instructionVisible) {
      instructionClassName = `${instructionClassName} Video-hide`;
    }

    const togglePlay = () => {
      if (mediaPlayer) {
        const paused = mediaPlayer.paused || mediaPlayer.ended;
        this.setState({
          ...this.state,
          instructionVisible: !paused
        });
        if (paused) {
          mediaPlayer.play()
        } else {
          mediaPlayer.pause();
        }
      }
    };

    return (
      <div className='Video-container'>
        <div className={instructionClassName}>Click to play/pause</div>
        <video
          className='Video-child'
          src={this.state.src}
          height={this.state.height}
          width={this.state.width}
          onClick={togglePlay}
          ref={(element) => {
            mediaPlayer = element
          }}/>
      </div>
    );
  }
};

export default Video;
