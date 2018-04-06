import React, { Component } from 'react';
import Button from '../components/Button.js';
import Dropdown from '../components/Dropdown.js';
import Header from '../components/Header.js';
import Input from '../components/Input';
import countries from '../data/country.js';
import genders from '../data/gender.js';
import ages from '../data/age.js';
import { updateUser } from '../stores/user.js';

class Register extends Component {

  constructor (props) {
    super(props);
    this.updateUsername = this.updateUsername.bind(this);
    this.updateOption = this.updateOption.bind(this);
    this.state = {
      complete: false
    }
  }

  updateUsername (username) {
    this.props.user.username = username;
    updateUser(this.props.user);
    this.setState({...this.state, complete: true});
  }

  updateOption (option, value) {
    const userValue = (value === 'Prefer not to say') ? undefined : value;
    this.props.user[option] = userValue;
    updateUser(this.props.user);
  }

  render () {

    const button = this.state.complete ? (<Button click={this.props.chooseDeed} text='Choose a deed'/>) : null;
    return (
      <div>
        <Header text='Your unique id is:'/>
        <div>
          {this.props.user.id}
        </div>
        <div>
          You do not have to remember this!
        </div>
        <Header text='Choose a user name:'/>
        <div>
          Please choose an easier-to-remember user name:
          <Input onChange={this.updateUsername}/>
        </div>
        <Header text='Tell us (or not) about yourself:'/>
        <div>
          Gender:
          <Dropdown options={genders} onChange={this.updateOption.bind(this, 'gender')} />
        </div>
        <div>
          Age:
          <Dropdown options={ages} onChange={this.updateOption.bind(this, 'age')} />
        </div>
        <div>
          Country:
          <Dropdown options={countries} onChange={this.updateOption.bind(this, 'country')}/>
        </div>
        {button}
      </div>
    );
  }
}

export default Register;
