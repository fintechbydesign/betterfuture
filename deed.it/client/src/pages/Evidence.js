import React, { Component } from 'react';
import UAParser from 'ua-parser-js';
import Button from '../components/Button';
import RadioGroup from '../components/RadioGroup';
import Text from '../components/Text';
import TitleWithImage from '../components/TitleWithImage';
import getLocation from '../data/location';
import thumbsup from '../images/thumbs-up.svg';
import './Evidence.css';

const methods = ['nextPage', 'selectRadioOptions', 'toggleAcceptTandCs'];

class Evidence extends Component {
  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    const radioOptions = this.selectRadioOptions();
    this.state = {
      acceptTandCs: false,
      page: null,
      radioOptions,
      requireTandCs: false
    };
  }

  selectRadioOptions () {
    const parser = new UAParser();
    const { name } = parser.getOS();
    const takePhoto = this.setPage.bind(this, 'takePhoto');
    const pledge = this.setPage.bind(this, 'pledge');
    const upload = this.setPage.bind(this, 'uploadPhoto');
    const separator = (<Text className='Evidence-separator' text='or' />);

    return (name === 'iOS')
      ? [
        { name: 'evidence', text: 'Send a photo', onChange: upload, separator },
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

  toggleAcceptTandCs () {
    this.setState({
      ...this.state,
      acceptTandCs: !this.state.acceptTandCs
    });
  }

  nextPage () {
    const { deed } = this.props;
    const { page } = this.state;
    const locationPromise = getLocation();
    this.props[page]({ deed, locationPromise });
  }

  render () {
    const { privacy, termsAndConditions } = this.props;
    const { acceptTandCs, page, requireTandCs } = this.state;

    const tandcsContent = [
      'By uploading a photo, you agree to abide  by our ',
      (<a key='link' onClick={termsAndConditions} >Terms of Use</a>),
      '.'
    ];

    const privacyContent = [
      'To see how we use your data see our ',
      (<a key='link' onClick={privacy} >Privacy Statement</a>)
    ];

    const tandcsClass = (requireTandCs) ? 'Evidence-tandcs-container dropin' : 'hidden';

    const locationText = 'We would like to capture your location so that we can show where the good deeds are being done.' +
      "  You can let us know if you're OK with that.";

    const buttonDisabled = !page || (requireTandCs && !acceptTandCs);

    return (
      <div className='page'>
        <TitleWithImage animation='zoom' src={thumbsup} text='Good Work' />
        <Text text='All you need to do now is send us some evidence to prove your deed is done.' />
        <RadioGroup radioOptions={this.state.radioOptions} />
        <div className='Evidence-location-container' >
          <Text text={locationText} />
        </div>
        <div className={tandcsClass} >
          <Text contents={privacyContent} className='Evidence-privacy' />
          <Text containerType='label' contents={tandcsContent} htmlFor='tandcs' />
          <input type='checkbox' id='tandcs' onChange={this.toggleAcceptTandCs} checked={acceptTandCs} />
        </div>
        <Button onClick={this.nextPage} disabled={buttonDisabled} text='Next' />
      </div>
    );
  }
}

export default Evidence;
