import React, { Component } from 'react';
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

    const forgetme = [
      'You have the right to be forgotten. Clicking ',
      (<a onClick={this.reset}>here</a>),
      ' will delete all data sent from this device, including uploaded images.'
    ];

    return (
      <div className='page'>
        <Title text='About Us'/>
        <Text dummyText={randomTextProps}/>
        <Title text='The Deedit Team'/>
        <Text dummyText={randomTextProps}/>
        <Title text='Contact Us'/>
        <Text dummyText={randomTextProps}/>
        <Title text='Forget about me'/>
        <Text contents={forgetme}/>
        {progressBar}
      </div>
    );
  }
}

export default AboutUs;
