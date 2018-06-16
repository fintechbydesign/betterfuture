import React, { Component } from 'react';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import Text from '../components/Text';
import Title from '../components/Title';

const randomTextProps = {
  count: 3,
  units: 'sentences',
  format: 'plain'
};

class AboutUs extends Component {

  constructor (props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.state = { progress: null };
  }

  reset () {
    this.setState({
      progress: {
        duration: 3000,
        text: 'Clearing all your user data...'
      }
    });
    this.props.reset();
  }

  render () {
    const { progress } = this.state;
    const progressBar = (progress) ? (<ProgressBar {...progress} />) : null;
    return (
      <div className='page'>
        <Title text='About Us'/>
        <Text dummyText={randomTextProps}/>
        <Title text='The Deedit Team'/>
        <Text dummyText={randomTextProps}/>
        <Title text='Contact Us'/>
        <Text dummyText={randomTextProps}/>
        <Title text='Forget about me'/>
        <Text text='You have the right to be forgotten'/>
        <Button text='Forget about me' onClick={this.reset}/>
        {progressBar}
      </div>
    );
  }
}

export default AboutUs;
