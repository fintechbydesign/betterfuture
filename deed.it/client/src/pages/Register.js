import React, { Component } from 'react';
import Button from '../components/Button';
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
import DeedTypeSummary from '../components/DeedTypeSummary';
import './Register.css';

const isScotland = (country) => country === 'Scotland';
const methods = ['getStarted', 'updateAge', 'updateCity', 'updateCountry', 'updateNickname', 'updateProgress'];

class Register extends Component {
  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = {
      age: undefined,
      city: undefined,
      country: undefined,
      nickname: undefined,
      progress: null
    };
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
    const { error, myProfile, uploading, user } = this.props;
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
      startDeed(updatedUser, { error, myProfile, uploading });
    } catch (err) {
      error({err});
    }
  }

  render () {
    const { termsAndConditions, user } = this.props;
    const { age, country, nickname, progress } = this.state;
    const { deedType } = user.selected;
    const { className, color } = deedType.style;

    const cityClassName = isScotland(country) ? 'Register-show' : 'hidden';
    const buttonEnabled = age && country && nickname  && nickname.trim().length > 2;

    const tandcs = [
      'Read our ',
      (<a onClick={termsAndConditions}>terms and conditions</a>),
      ' if you want to understand how we use your data.'
    ];

    const nickNameProps = {
      onChange: this.updateNickname,
      minLength: 3,
      maxLength: 30,
      placeholder: 'Please enter between 3 and 30 characters'
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

    return (
      <div className='page'>
        <Title text='Thank you!' />
        <Text text='You have picked:'/>
        <div {...summaryContainerProps} >
          <DeedTypeSummary {...summaryProps} />
        </div>
        <Text text='Before you get started, we just need a few details so we can track the progress of your deeds.' />
        <Text text='What can we call you?' className='Text-label'/>
        <Input {...nickNameProps} />
        <Text text='Where are you from?' className='Text-label' />
        <Dropdown options={countries} onChange={this.updateCountry} placeholder='Please select your country...' />
        <div className={cityClassName} >
          <Text text='Which is your nearest city?' className='Text-label' />
          <Dropdown options={cities} onChange={this.updateCity} placeholder='Please select your city...' />
        </div>
        <Text text='What age are you?' className='Text-label' />
        <Dropdown options={ages} onChange={this.updateAge} placeholder='Please select your age...'/>
        <Button text='Get started >' onClick={this.getStarted} disabled={!buttonEnabled} />
        {progressBar}
        <Text contents={tandcs} />
      </div>
    );
  }
}

export default Register;
