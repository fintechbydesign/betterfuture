import React, { Component } from 'react';
import Button from '../components/Button';
import RadioGroup from '../components/RadioGroup';
import Text from '../components/Text';
import Title from '../components/Title';
import getLocation from '../data/location';
import './Evidence.css';

class Evidence extends Component {
  constructor (props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.toggleRecordLocation = this.toggleRecordLocation.bind(this);
    const radioOptions = [
      { name: 'evidence', text: 'Upload a photo', onChange: this.setPage.bind(this, 'uploadPhoto') },
      { name: 'evidence', text: 'Take a photo', onChange: this.setPage.bind(this, 'takePhoto') },
      { name: 'evidence', text: 'Sign the Deedit pledge', onChange: this.setPage.bind(this, 'pledge') }
    ];
    this.state = {
      page: null,
      radioOptions,
      recordLocation: true
    };
  }

  setPage (page) {
    this.setState({
      ...this.state,
      page
    });
  }

  toggleRecordLocation () {
    this.setState({
      ...this.state,
      recordLocation: !this.state.recordLocation
    });
  }

  nextPage () {
    const { deed } = this.props;
    const { page, recordLocation } = this.state;
    const locationPromise = (recordLocation) ? getLocation() : Promise.resolve();
    this.props[page]({ deed, locationPromise });
  }

  render () {
    const { privacy } = this.props;
    const { page, recordLocation } = this.state;
    const labelText="We would like to capture your location so that we can show where the good deeds are being done." +
      "  You can let us know if you're OK with that.";
    const privacyContents = [
      'We care about your privacy. You can read more in our',
      (<a key='link' onClick={privacy} >Privacy Notice</a> )
    ];
    const buttonDisabled = !page;
    return (
      <div className='page'>
        <Title text='Good Work' />
        <Text text='All you need to do now is send us some evidence to prove your deed is done.' />
        <RadioGroup radioOptions={this.state.radioOptions} />
        <div>
          <Text text="Where's your deed at" className='Evidence-bold' />
          <label htmlFor='location'>{labelText}</label>
          <input type='checkbox' id='location' onChange={this.toggleRecordLocation} checked={recordLocation} />
          <Text contents={privacyContents} />
        </div>
        <Button onClick={this.nextPage} disabled={buttonDisabled} text="Next" />
      </div>
    );
  }
}

export default Evidence;
