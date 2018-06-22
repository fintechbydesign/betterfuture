import React, { Component } from 'react';
import UAParser from 'ua-parser-js';
import Button from '../components/Button';
import RadioGroup from '../components/RadioGroup';
import Text from '../components/Text';
import TitleWithImage from '../components/TitleWithImage';
import getLocation from '../data/location';
import thumbsup from '../images/thumbs-up.svg';
import './Evidence.css';

const methods = ['nextPage', 'selectRadioOptions', 'toggleRecordLocation'];

class Evidence extends Component {
  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    const radioOptions = this.selectRadioOptions();
    this.state = {
      page: null,
      radioOptions,
      recordLocation: true
    };
  }

  selectRadioOptions () {
    const parser = new UAParser();
    const { name } = parser.getOS();
    return ('iOS' === name)
      ? [
        { name: 'evidence', text: 'Send a photo', onChange: this.setPage.bind(this, 'uploadPhoto') },
        { name: 'evidence', text: 'Sign the Deedit pledge', onChange: this.setPage.bind(this, 'pledge') }
      ]
      : [
        { name: 'evidence', text: 'Upload a photo', onChange: this.setPage.bind(this, 'uploadPhoto') },
        { name: 'evidence', text: 'Take a photo', onChange: this.setPage.bind(this, 'takePhoto') },
        { name: 'evidence', text: 'Sign the Deedit pledge', onChange: this.setPage.bind(this, 'pledge') }
      ];
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
      'We care about your privacy. You can read more in our ',
      (<a key='link' onClick={privacy} >Privacy Notice</a> )
    ];
    const buttonDisabled = !page;
    return (
      <div className='page'>
        <TitleWithImage src={thumbsup} text='Good Work' />
        <Text text='All you need to do now is send us some evidence to prove your deed is done.' />
        <RadioGroup radioOptions={this.state.radioOptions} />
        <div className='Evidence-privacy-container' >
          <Text text="Where's your deed at" className='Evidence-bold' />
          <label htmlFor='location'>{labelText}</label>
          <input type='checkbox' id='location' onChange={this.toggleRecordLocation} checked={recordLocation} />
        </div>
        <Text contents={privacyContents} />
        <Button onClick={this.nextPage} disabled={buttonDisabled} text="Next" />
      </div>
    );
  }
}

export default Evidence;
