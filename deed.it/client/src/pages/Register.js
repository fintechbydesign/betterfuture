import React, { Component } from 'react';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Text from '../components/Text';
import Input from '../components/Input';
import Title from '../components/Title';
import { createSelectedDeed } from '../data/deeds';
import {registerUser, updateLocalUser} from '../data/user';
import ages from '../data/age.js';
import cities from '../data/city';
import countries from '../data/country.js';
import DeedTypeSummary from '../components/DeedTypeSummary';
import './Register.css';

const isScotland = (country) => country === 'Scotland';
const methods = ['getStarted', 'updateAge', 'updateCity', 'updateCountry', 'updateNickname'];

class Register extends Component {
  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = {
      age: undefined,
      city: undefined,
      country: undefined,
      nickname: undefined
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
      nickname
    });
  }

  async getStarted () {
    const { error, myProfile, uploading, user } = this.props;
    const { age, city, country, nickname } = this.state;
    try {
      uploading({ uploadMsg: 'Registering you as a deedit do-er!' });
      let updatedUser = {
        ...user,
        personal: { age, city, country },
        nickname
      };
      updatedUser = await registerUser(updatedUser);
      await createSelectedDeed(updatedUser);
      updateLocalUser({
        ...updatedUser,
        selected: null
      });
      myProfile();
    } catch (err) {
      error({err});
    }
  }

  render () {
    const { termsAndConditions, user } = this.props;
    const { deedType } = user.selected;
    const { description, image } = deedType;
    const { age, country, nickname } = this.state;

    const cityClassName = isScotland(country) ? 'Register-show' : 'Register-hide';
    const buttonEnabled = age && country && nickname;

    const tandcs = [
      'Read our ',
      (<a className='Register-link' onClick={termsAndConditions}>terms and conditions</a>),
      ' if you want to understand how we use your data.'
    ];

    return (
      <div className='page'>
        <Title text='Thank you!' />
        <Text text='You have picked:' />
        <DeedTypeSummary description={description} image={image} />
        <Text text='Before you get started, we just need a few details so we can track the progress of your deeds.' />
        <Text text='What can we call you?' />
        <Input onChange={this.updateNickname} />
        <Text text='Where are you from?' />
        <Dropdown options={countries} onChange={this.updateCountry} />
        <div className={cityClassName} >
          <Text text='Which is your nearest city?' />
          <Dropdown options={cities} onChange={this.updateCity} />
        </div>
        <Text text='What age are you?' />
        <Dropdown options={ages} onChange={this.updateAge} />
        <Button text='Get started >' click={this.getStarted} disabled={!buttonEnabled} />
        <Text contents={tandcs} />
      </div>
    );
  }
}

export default Register;
