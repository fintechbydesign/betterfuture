import React, { Component } from 'react';
import Button from '../components/Button.js';
import Header from '../components/Header.js';
import Instruction from '../components/Instruction.js';
import { getUserDeedId, incrementUserWallet, removeUserDeed } from '../stores/user.js';
import { getDeedById } from '../stores/deeds.js';

const getUserDeed = () => {
  const deedId = getUserDeedId();
  return deedId ? getDeedById(deedId): undefined;
};

class ChooseDeed extends Component { 

  constructor (props) {
    super(props);
    this.state = {};
  }

  render() {
    const deed = getUserDeed();
    const instruction = `You have ${deed.reward} betties to spend. Choose what to do with them once your deed has been verified:`;
    let chooseFn;
    switch (this.state.option) {
      case 'store':
        chooseFn = () => {
          incrementUserWallet(deed.reward);
          removeUserDeed();
          this.props.choose();
        };
        break;
      case 'donate':
        chooseFn = () => {
          removeUserDeed();
          this.props.choose();
        };
        break;
      default:
    };
    const button = chooseFn ? (<Button click={chooseFn} text='Choose' />) : null;
    const optionChosen = (event) => this.setState({...this.state, option: event.target.id});
    return (
      <div>
        <Header text='Well done and thank you on completing your deed!' />
        <Instruction text={instruction} />
        <fieldset>
          <div>
            <input type='radio' id='donate' onChange={optionChosen} />
            <label for='donate'>Donate to a mega-deed</label>
          </div>
          <div>
            <input type='radio' id='store' onChange={optionChosen} />
            <label for='store'>Store in my wallet</label>
          </div>
        </fieldset>
        <div>
          {button}
        </div>
      </div>
    );
  }
}

export default ChooseDeed;
