import React, { Component } from 'react';
import Button from '../components/Button.js';
import Title from '../components/Title.js';
import Instruction from '../components/Instruction.js';
import { getUser, updateUser } from '../stores/user.js';
import { getDeed } from '../stores/deeds.js';

const getUserDeed = () => {
  const deedId = getUser().deedId;
  return deedId ? getDeed(deedId): undefined;
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
          this.props.user.wallet += deed.reward;
          this.props.user.deedId = undefined;
          updateUser(this.props.user);
          this.props.welcomeBack();
        };
        break;
      case 'donate':
        chooseFn = () => {
          this.props.user.deedId = undefined;
          updateUser(this.props.user);
          this.props.welcomeBack();
        };
        break;
      default:
    };
    const button = chooseFn ? (<Button click={chooseFn} text='Choose' />) : null;
    const optionChosen = (event) => this.setState({...this.state, option: event.target.id});
    return (
      <div>
        <Title text='Well done and thank you on completing your deed!' />
        <Instruction text={instruction} />
        <fieldset>
          <div>
            <input type='radio' id='donate' onChange={optionChosen} />
            <label htmlFor='donate'>Donate to a mega-deed</label>
          </div>
          <div>
            <input type='radio' id='store' onChange={optionChosen} />
            <label htmlFor='store'>Store in my wallet</label>
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
