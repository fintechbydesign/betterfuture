import React, { Component } from 'react';
import UAParser from 'ua-parser-js';
import Button from '../components/Button';
import RadioGroup from '../components/RadioGroup';
import Text from '../components/Text';
import TitleWithImage from '../components/TitleWithImage';
import getLocation from '../data/location';
import thumbsup from '../images/thumbs-up.svg';
import './Evidence.css';

const methods = ['nextPage', 'selectRadioOptions', 'toggleAcceptTandCs', 'toggleRecordLocation'];

class Evidence extends Component {
  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    const radioOptions = this.selectRadioOptions();
    this.state = {
      acceptTandCs: true,
      page: null,
      radioOptions,
      recordLocation: true,
      requireTandCs: false
    };
  }

  selectRadioOptions () {
    const parser = new UAParser();
    const { name } = parser.getOS();
    const takePhoto = this.setPage.bind(this, 'takePhoto');
    const pledge = this.setPage.bind(this, 'pledge');
    const upload = this.setPage.bind(this, 'uploadPhoto');
    return ('iOS' === name)
      ? [
        { name: 'evidence', text: 'Send a photo', onChange: upload },
        { name: 'evidence', text: 'Sign the Deedit pledge', onChange: pledge }
      ]
      : [
        { name: 'evidence', text: 'Upload a photo', onChange: upload },
        { name: 'evidence', text: 'Take a photo', onChange: takePhoto },
        { name: 'evidence', text: 'Sign the Deedit pledge', onChange: pledge }
      ];
  }

  setPage (page) {
    this.setState({
      ...this.state,
      page,
      requireTandCs: ['takePhoto', 'uploadPhoto'].includes(page)
    });
  }

  toggleRecordLocation () {
    this.setState({
      ...this.state,
      recordLocation: !this.state.recordLocation
    });
  }

  toggleAcceptTandCs () {
    this.setState({
      ...this.state,
      acceptTandCs: !this.state.acceptTandCs
    });
  }

  nextPage () {
    const { deed } = this.props;
    const { page, recordLocation } = this.state;
    const locationPromise = (recordLocation) ? getLocation() : Promise.resolve();
    this.props[page]({ deed, locationPromise });
  }

  render () {
    const { termsAndConditions } = this.props;
    const { acceptTandCs, page, recordLocation, requireTandCs } = this.state;

    const tandcsContent = [
      'By uploading a photo, you accept to abide by our ',
      (<a key='link' onClick={termsAndConditions} >Terms and Conditions</a> )
    ];
    const tandcsClass = (requireTandCs) ? 'Evidence-tandcs-container dropin' : 'hidden';


    const locationText="We would like to capture your location so that we can show where the good deeds are being done." +
      "  You can let us know if you're OK with that.";

    const buttonDisabled = !page || (requireTandCs && !acceptTandCs);

    return (
      <div className='page'>
        <TitleWithImage src={thumbsup} text='Good Work' />
        <Text text='All you need to do now is send us some evidence to prove your deed is done.' />
        <RadioGroup radioOptions={this.state.radioOptions} />
        <div className={tandcsClass} >
          <Text containerType='label' contents={tandcsContent} htmlFor='tandcs' />
          <input type='checkbox' id='tandcs' onChange={this.toggleAcceptTandCs} checked={acceptTandCs} />
        </div>
        <div className='Evidence-location-container' >
          <Text text="Where's your deed at" className='Evidence-bold' />
          <label htmlFor='location'>{locationText}</label>
          <input type='checkbox' id='location' onChange={this.toggleRecordLocation} checked={recordLocation} />
        </div>
        <Button onClick={this.nextPage} disabled={buttonDisabled} text="Next" />
      </div>
    );
  }
}

export default Evidence;
