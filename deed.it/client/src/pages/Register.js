import React, { Component } from 'react';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Text from '../components/Text';
import Input from '../components/Input';
import Title from '../components/Title';
import { createDeed } from '../data/deeds';
import { createUser, updateLocalUser } from '../data/user';
import ages from '../data/age.js';
import countries from '../data/country.js';
import DeedSummary from '../components/DeedSummary';

const methods = ['getStarted', 'updateAge', 'updateCountry', 'updateUsername'];

class Register extends Component {
  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = {
      age: undefined,
      country: undefined,
      username: undefined
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

  updateUsername (username) {
    this.setState({
      ...this.state,
      username
    });
  }

  async getStarted () {
    try {
      const {age, country, username} = this.state;
      const user = {
        ...this.props.user,
        personal: {age, country},
        username
      };
      await createUser(user);
      await createDeed(user, user.deeds.selected.deedType);
      updateLocalUser({
        ...user,
        deeds: {
          ...user.deeds,
          selected: null
        }
      });
      this.props.myProfile();
    } catch (err) {
      this.props.error(err);
    }
  }

  render () {
    const { deedType } = this.props.user.deeds.selected;
    const { description, image } = deedType;
    const { age, country, username } = this.state;
    const buttonEnabled = age && country && username;

    return (
      <div>
        <Title text='Thank you!' />
        <Text text='You have picked:' />
        <DeedSummary description={description} image={image} />
        <Text text='Before you get started, we just need a few details so we can track the progress of your deeds.' />
        <Text text='What can we call you?' />
        <Input onChange={this.updateUsername} />
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
