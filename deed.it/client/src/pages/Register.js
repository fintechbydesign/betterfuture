import React, { Component } from 'react';
import Button from '../components/Button';
import DeedTypeSummary from '../components/DeedTypeSummary';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';
import ProgressBar from '../components/ProgressBar';
import startDeed from '../components/startDeed';
import Text from '../components/Text';
import Title from '../components/Title';
import { registerUser } from '../data/user';
import ages from '../data/age.js';
import cities from '../data/city';
import countries from '../data/country.js';
import flags from '../../../common/src/images/flags';
import './Register.css';
import Image from '../components/Image';

const isScotland = (country) => country === 'Scotland';

const isUnderage = (age) => age === '0-13';

const methods = [
  'getStarted',
  'toggleUnderAge',
  'updateAge',
  'updateCity',
  'updateCountry',
  'updateNickname',
  'updateProgress'
];

class Register extends Component {
  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = {
      age: undefined,
      city: undefined,
      country: undefined,
      nickname: undefined,
      progress: null,
      underage: false
    };
  }

  toggleUnderAge () {
    this.setState({
      ...this.state,
      underage: !this.state.underage
    });
  }

  updateAge (age) {
    this.setState({
      ...this.state,
      age
    });
  }

  updateCity (city) {
    this.setState({
      ...this.state,
      city
    });
  }

  updateCountry (country) {
    const city = isScotland(country) ? this.state.city : undefined;
    this.setState({
      ...this.state,
      city,
      country
    });
  }

  updateNickname (nickname) {
    this.setState({
      ...this.state,
      nickname: nickname.trim()
    });
  }

  updateProgress (text) {
    this.setState({
      ...this.state,
      progress: {
        duration: 3000,
        text
      }
    });
  }

  async getStarted () {
    const { deedType, error, exhort, user } = this.props;
    const { age, city, country, nickname } = this.state;
    try {
      this.updateProgress('Registering you as a deedit do-er!');
      let updatedUser = {
        ...user,
        personal: { age, city, country },
        nickname
      };
      updatedUser = await registerUser(updatedUser);
      this.updateProgress('Assigning the deed to you...');
      startDeed(updatedUser, deedType, { error, exhort });
    } catch (err) {
      error({err});
    }
  }

  render () {
    const { deedType, privacy } = this.props;
    const { age, city, country, nickname, progress, underage } = this.state;
    const { className, color } = deedType.style;

    const cityClassName = isScotland(country) ? 'Register-show-city dropin' : 'hidden';
    const underageClassName = isUnderage(age) ? 'Register-show-age dropin' : 'hidden';
    const buttonEnabled =
      age &&
      (!isUnderage(age) || underage) &&
      country &&
      (!isScotland(country) || city) &&
      nickname &&
      nickname.trim().length >= 2;

    const tandcs = [
      'Read our ',
      (<a key='link' onClick={privacy}>Privacy Statement</a>),
      ' if you want to understand how we use your data'
    ];

    const nickNameProps = {
      onChange: this.updateNickname,
      minLength: 2,
      maxLength: 30,
      placeholder: 'Please enter 2-30 characters'
    };

    const summaryContainerProps = {
      className: `Register-deed-type ${className}`
    };

    const summaryProps = {
      deedType,
      hideButton: true
    };

    const progressBar = (progress)
      ? (<ProgressBar {...progress} color={color} />)
      : null;

    // this is here to simply pre-load the image for the MyProfile page
    const hiddenFlag = (country)
      ? (<Image src={flags[country]} className='hidden' />)
      : null;

    return (
      <div className='page'>
        <Title text='Thank you!' />
        <Text text='You have picked:' />
        <div {...summaryContainerProps} >
          <DeedTypeSummary {...summaryProps} />
        </div>
        <Text text='Before you get started, we just need a few details so we can track the progress of your deeds.' />
        <Text text='What can we call you?' className='Text-label' />
        <Input {...nickNameProps} />
        <Text text='Where are you from?' className='Text-label' />
        <Dropdown options={countries} onChange={this.updateCountry} placeholder='Please select your country...' />
        <div className={cityClassName} >
          <Text text='Which is your nearest city?' className='Text-label' />
          <Dropdown options={cities} onChange={this.updateCity} placeholder='Please select your city...' />
        </div>
        <Text text='What age are you?' className='Text-label' />
        <Dropdown options={ages} onChange={this.updateAge} placeholder='Please select your age...' />
        <div className={underageClassName} >
          <Text containerType='label' text='I, as parent/guardian, give permission for the above child to take part in Deedit.' htmlFor='underage' />
          <input type='checkbox' id='underage' onChange={this.toggleUnderAge} checked={underage} />
        </div>
        <Button text='Get started >' onClick={this.getStarted} disabled={!buttonEnabled} />
        {progressBar}
        <Text contents={tandcs} className='Register-tandc' />
        {hiddenFlag}
      </div>
    );
  }
}

export default Register;
