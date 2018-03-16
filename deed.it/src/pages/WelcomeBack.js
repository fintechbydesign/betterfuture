import React, { Component } from 'react';
import Button from '../components/Button.js';
import Header from '../components/Header.js';
import Instruction from '../components/Instruction.js';
import { getUserDeedId, getUserWallet } from '../stores/user.js';
import { getDeedById } from '../stores/deeds.js';

const getUserDeed = () => {
  const deedId = getUserDeedId();
  return deedId ? getDeedById(deedId): undefined;
};

class WelcomeBack extends Component { 
  renderWallet (wallet) {
    return (
      <div>
        <Instruction text={`You currently have ${wallet} betties in your wallet`} />
        <Button click={this.props.showWallet} text='Click here to spend them!' />
      </div>
    );
  }

  renderDeed (deed) {
    return (
      <div>
        <Instruction text={`Your current deed is '${deed.display}'`} />
        <div>
          <Button click={this.props.displayDeed} text='View your deed' />
        </div>
        <div>
          <Button click={this.props.completeDeed} text='Report your deed done' />
        </div>
      </div>
    );
  }

  renderNoDeed () {
    return (
      <div>
        <Instruction text="You don't have a deed to do at the moment; please choose one:" />
        <div>
          <Button click={this.props.chooseDeed} text='Choose deed' />
        </div>
      </div>
    );
  }
  
  render() {
    const deed = getUserDeed();
    const deedOptions = deed ? this.renderDeed(deed) : this.renderNoDeed();
    const wallet = getUserWallet();
    const walletOptions = wallet > 0 ? this.renderWallet(wallet) : null;
    return (
      <div>
        <Header text= 'Welcome back to deed.it' />
        { deedOptions }
        { walletOptions }
        <div>
          <a onClick={this.props.reset}>reset</a>
        </div>
      </div>
    );
  }
}

export default WelcomeBack;
