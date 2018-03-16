import React, { Component } from 'react';
import Button from '../components/Button.js';
import Dropdown from '../components/Dropdown.js';
import Header from '../components/Header.js';
import countries from '../data/country.js';
import genders from '../data/gender.js';
import ages from '../data/age.js';
import { createUserId } from '../stores/user.js';

class Register extends Component { 
  render() {
    const newUserId = createUserId();
    return (
      <div>
        <Header text='Your unique id is:' />
        <div>
          {newUserId}
        </div>
        <div>
          though you do not have to remember this!
        </div>
        <Header text='Tell us (or not) about yourself:' />
        <div>
          Gender:
          <Dropdown options={genders} />
        </div>
        <div>
          Age:
          <Dropdown options={ages} />
        </div>
        <div>
          Country:
          <Dropdown options={countries} />
        </div>
        <Button click={this.props.chooseDeed} text='Choose a deed' />
      </div>
    );
  }
}

export default Register;
