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
      { name: 'evidence', text: 'Upload a photo or a video', onChange: this.setPage.bind(this, 'uploadPhoto') },
      { name: 'evidence', text: 'Take a photo', onChange: this.setPage.bind(this, 'takePhoto') },
      { name: 'evidence', text: 'Sign the deedit pledge', onChange: this.setPage.bind(this, 'pledge') }
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
        <Title text='Good Work' />
        <Text text='All you need to do now is send us some evidence to prove your deed is done.' />
        <RadioGroup radioOptions={this.state.radioOptions} />
        <Button click={this.nextPage} disabled={!buttonEnabled} text="Next" />
      </div>
    );
  }
}

export default Evidence;
