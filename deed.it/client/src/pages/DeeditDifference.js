import React, { Component } from 'react';
import Image from '../components/Image'
import ProgressBar from '../components/ProgressBar';
import Title from '../components/Title';
import './DeeditDifference.css';

const url = 'https://s3-eu-west-1.amazonaws.com/deedit-smallscreen-dashboard/mini_screen.png';

class DeeditDifference extends Component {

  constructor (props) {
    super(props);
    this.show = this.show.bind(this);
    this.state = { hidden: true }
  }

  show () {
    this.setState({
      ...this.state,
      hidden: false
    });
  }

  render () {
    const { hidden } = this.state;
    const progressProps = {
      className: hidden ? 'DeeditDifference-show' : 'hidden',
      duration: 3000,
      style: {
        'font-size': 'large'
      },
      text: 'Fetching latest statistics...'
    };
    const imageProps = {
      alt: 'Deedit statistics',
      className: hidden? 'hidden' : 'DeeditDifference-show',
      onLoad: this.show,
      src: url
    };
    return (
      <div className='page'>
        <Title text='Small deeds make a big difference'/>
        <ProgressBar { ...progressProps } />
        <Image { ...imageProps } />
      </div>
    );
  }
}

export default DeeditDifference;
