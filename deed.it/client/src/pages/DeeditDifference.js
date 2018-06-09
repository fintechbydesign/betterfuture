import React, { Component } from 'react';
import Fetching from '../components/Fetching';
import Image from '../components/Image'
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
    const fetchingClass = hidden ? 'DeeditDifference-show' : 'hidden';
    const imageClass = hidden? 'hidden' : 'DeeditDifference-show';

    return (
      <div className='page'>
        <Title text='Small deeds make a big difference'/>
        <Fetching className={fetchingClass} text='Fetching latest statistics...' />
        <Image src={url} alt='Deedit statistics' className={imageClass} onLoad={this.show} />
      </div>
    );
  }
}

export default DeeditDifference;
