import React, { Component } from 'react';
import Button from '../components/Button';
import RadioGroup from '../components/RadioGroup';
import Text from '../components/Text';
import Title from '../components/Title';

class Evidence extends Component {
  constructor (props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    const radioOptions = [
      { name: 'evidence', text: 'Upload an existing photo or a video', onChange: this.setPage.bind(this, 'uploadPhoto') },
      { name: 'evidence', text: 'Take a photo and upload', onChange: this.setPage.bind(this, 'takePhoto') },
      { name: 'evidence', text: 'Just report the deeed done', onChange: this.setPage.bind(this, 'pledge') }
    ];
    this.state = {
      page: null,
      radioOptions
    };
  }

  setPage (page) {
    this.setState({
      ...this.state,
      page
    });
  }

  nextPage () {
    this.props[this.state.page]();
  }

  render () {
    const buttonEnabled = this.state.page;
    return (
      <div className='page'>
        <Title text='Your deed is done' />
        <Text text='Send us your evidence to prove your deed is done and see how you`ve made a difference.' />
        <RadioGroup radioOptions={this.state.radioOptions} />
        <Button click={this.nextPage} disabled={!buttonEnabled} text="I've done it >" />
      </div>
    );
  }
}

export default Evidence;
