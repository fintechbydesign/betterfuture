import React, { Component } from 'react';
import Button from '../components/Button.js';
import Header from '../components/Header.js';
import { getDeedById } from '../stores/deeds.js';
import { getUserDeedId } from '../stores/user.js';

class DisplayDeed extends Component { 
  render() {
    const deedId = getUserDeedId();
    const deed = getDeedById(deedId);
    const imageSrc = `${process.env.PUBLIC_URL}/${deed.image}`;
    return (
      <div>
        <Header text='Here is your deed:' />
        <div>
          {deed.display}
        </div>
        <img src={imageSrc} alt='illustrates the deed' />
        <div>
          {deed.description}
        </div>
        <div>
          {`(Reward is ${deed.reward} betties)`}
        </div>
        <div>
          <Button click={this.props.accept} text='Accept this deed' />
        </div>
        <div>
          <Button click={this.props.reject} text='Choose another deed instead' />
        </div>
      </div>
    );
  }
}

export default DisplayDeed;
