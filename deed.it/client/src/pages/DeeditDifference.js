import React, { Component } from 'react';
import Image from '../components/Image';
import ProgressBar from '../components/ProgressBar';
import Text from '../components/Text';
import Title from '../components/Title';
import './DeeditDifference.css';
import Back from "../components/Back";

const timeout = 15000;

// const url = 'https://s3-eu-west-1.amazonaws.com/deedit-smallscreen-dashboard/LatestMiniDash.png';
const url = 'https://s3-eu-west-1.amazonaws.com/deedit-bigscreen-dashboard/LatestBigDash.png';

const generateUrl = () => {
  const cacheBuster = Date.now();
  return `${url}?${cacheBuster}`;
}

// three modes : fetch / show / timeout
class DeeditDifference extends Component {
  constructor (props) {
    super(props);
    this.show = this.show.bind(this);
    this.state = { mode: 'fetch' };
  }

  componentDidMount () {
    setTimeout(this.timeout.bind(this), timeout);
  }

  show () {
    const { mode } = this.state;
    if (mode === 'fetch') {
      this.setState({
        ...this.state,
        mode: 'show'
      });
    }
  }

  timeout () {
    const { mode } = this.state;
    if (mode === 'fetch') {
      this.setState({
        ...this.state,
        mode: 'timeout'
      });
    }
  }

  render () {
    const { back } = this.props;
    const { mode } = this.state;
    const progressProps = {
      className: (mode === 'fetch') ? 'DeeditDifference-show' : 'hidden',
      duration: timeout,
      infinite: true,
      style: {
        'fontSize': 'large'
      },
      text: 'Fetching latest statistics...'
    };
    const imageProps = {
      alt: 'Deedit statistics',
      className: (mode === 'show') ? 'DeeditDifference-show' : 'hidden',
      onLoad: this.show,
      src: generateUrl()
    };
    const errorProps = {
      className: (mode === 'timeout') ? 'DeeditDifference-show' : 'hidden',
      text: 'Sorry - deedit statistics cannot be shown at this time. :-('
    };
    return (
      <div className='page'>
        <Back back={back} />
        <Title text='Small deeds make a big difference' />
        <ProgressBar {...progressProps} />
        <Image {...imageProps} />
        <Text {...errorProps} />
        <Back back={back} />
      </div>
    );
  }
}

export default DeeditDifference;
