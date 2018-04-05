import React, { Component } from 'react';
import { getUser, removeUser } from "../stores/user";
import ChooseDeed from '../pages/ChooseDeed.js';
import ChooseReward from '../pages/ChooseReward.js';
import CompleteDeed from '../pages/CompleteDeed.js';
import DisplayDeed from '../pages/DisplayDeed.js';
import Error from '../pages/Error.js';
import Register from '../pages/Register.js';
import ShowWallet from '../pages/ShowWallet.js';
import TakePhoto from '../pages/TakePhoto.js';
import Welcome from '../pages/Welcome.js';
import WelcomeBack from '../pages/WelcomeBack.js';
import logo from '../images/mercury.jpeg';
import './App.css';

const stages = [
  'chooseDeed',
  'chooseReward',
  'completeDeed',
  'displayDeed',
  'register',
  'showWallet',
  'takePhoto',
  'welcome',
  'welcomeBack',
];

const getInitialState = () => {
  let stage;
  let user;
  try {
    user = getUser();
    stage = 'welcomeBack';
  } catch (err) {
    stage = 'welcome';
  }
  return { stage, user };
};


class App extends Component {

  constructor (props) {
    super(props);

    this.state = getInitialState();

    this.setState = this.setState.bind(this);
    const setStage = (stage) => this.setState({...this.state, stage})
    stages.forEach((stage) => {
      this[stage] = setStage.bind(this, stage);
    });
    this.reset = () => {
      removeUser();
      this.welcome();
    };
  }

  selectPage () {
    try {
      switch (this.state.stage) {
        case 'welcome':
          return (<Welcome register={this.register} />);
        case 'welcomeBack':
          return (<WelcomeBack
            chooseDeed={this.chooseDeed}
            displayDeed={this.displayDeed}
            completeDeed={this.completeDeed}
            reset={this.reset}
            showWallet={this.showWallet} />);
        case 'register':
          return (<Register chooseDeed={this.chooseDeed} />);
        case 'chooseDeed':
          return (<ChooseDeed displayDeed={this.displayDeed} />);
        case 'displayDeed':
          return (<DisplayDeed accept={this.welcomeBack} reject={this.chooseDeed} />);
        case 'completeDeed':
          return (<CompleteDeed takePhoto={this.takePhoto} submit={this.chooseReward} cancel={this.welcomeBack} />);
        case 'chooseReward':
          return (<ChooseReward choose={this.welcomeBack} />);
        case 'showWallet':
          return (<ShowWallet back={this.welcomeBack} />);
        case 'takePhoto':
          return (<TakePhoto chooseReward={this.chooseReward} cancel={this.welcomeBack} /> )
        default:
          throw new Error(`Unknown stage '${this.state.stage}'`);
      }
    }
    catch (err) {
      return (<Error err={err} reset={this.reset} />)
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">deed.it</h1>
        </header>
      { this.selectPage() }
      </div>
    );
  }
}

export default App;
