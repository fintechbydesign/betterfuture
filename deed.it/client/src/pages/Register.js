import React, { Component } from 'react';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Text from '../components/Text';
import Input from '../components/Input';
import Title from '../components/Title';
import { createSelectedDeed } from '../data/deeds';
import {registerUser, updateLocalUser} from '../data/user';
import ages from '../data/age.js';
import countries from '../data/country.js';
import DeedSummary from '../components/DeedSummary';

const methods = ['getStarted', 'updateAge', 'updateCountry', 'updateNickname'];

class Register extends Component {
  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = {
      age: undefined,
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

  updateCountry (country) {
    this.setState({
      ...this.state,
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
    const { age, country, nickname } = this.state;
    try {
      uploading({ uploadMsg: 'Registering you as a deedit do-er!' });
      let updatedUser = {
        ...user,
        personal: { age, country },
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
    const { deedType } = this.props.user.selected;
    const { description, image } = deedType;
    const { age, country, nickname } = this.state;
    const buttonEnabled = age && country && nickname;

    return (
      <div className='page'>
        <Title text='Thank you!' />
        <Text text='You have picked:' />
        <DeedSummary description={description} image={image} />
        <Text text='Before you get started, we just need a few details so we can track the progress of your deeds.' />
        <Text text='What can we call you?' />
        <Input onChange={this.updateNickname} />
        <Text text='Where are you from?' />
        <Dropdown options={countries} onChange={this.updateCountry} />
        <Text text='What age are you?' />
        <Dropdown options={ages} onChange={this.updateAge} />
        <Button text='Get started >' click={this.getStarted} disabled={!buttonEnabled} />
        <Text text='Read our terms and conditions if you want to understand how we use your data.' />
      </div>
    );
  }
}

export default Register;
