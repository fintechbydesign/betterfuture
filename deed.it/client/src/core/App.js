import React, { Component } from 'react';
import { createUser, getUser, removeUser } from "../stores/user";
import ChooseDeed from '../pages/ChooseDeed.js';
import ChooseReward from '../pages/ChooseReward.js';
import CompleteDeed from '../pages/CompleteDeed.js';
import DisplayDeed from '../pages/DisplayDeed.js';
import Error from '../pages/Error.js';
import Register from '../pages/Register.js';
import ShowWallet from '../pages/ShowWallet.js';
import TakePhoto from '../pages/TakePhoto.js';
import UploadPhoto from '../pages/UploadPhoto.js';
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
  'uploadPhoto',
  'welcome',
  'welcomeBack',
];

class App extends Component {

  constructor (props) {
    super(props);

    this.setState = this.setState.bind(this);

    this.state = this.createInitialState();
    this.state.navigationMethods = this.createNavigationMethods();
  }

  createInitialState () {
    let stage;
    let user;
    try {
      user = getUser();
      stage = 'welcomeBack';
    } catch (err) {
      user = createUser();
      stage = 'welcome';
    }
    return { stage, user };
  }

  createNavigationMethods () {
    const navigationMethods = {};
    stages.forEach((stage) => {
      navigationMethods[stage] = () => this.setState({...this.state, stage});
    });
    navigationMethods.reset = () => {
      removeUser();
      navigationMethods.welcome();
    };
    return navigationMethods;
  }

  selectPage () {
    try {
      const pageProps = { ...this.state.navigationMethods, user: this.state.user };
      switch (this.state.stage) {
        case 'welcome':
          return (<Welcome {...pageProps} />);
        case 'welcomeBack':
          return (<WelcomeBack {...pageProps} />);
        case 'register':
          return (<Register {...pageProps} />);
        case 'chooseDeed':
          return (<ChooseDeed {...pageProps} />);
        case 'displayDeed':
          return (<DisplayDeed {...pageProps} />);
        case 'completeDeed':
          return (<CompleteDeed {...pageProps} />);
        case 'chooseReward':
          return (<ChooseReward {...pageProps} />);
        case 'showWallet':
          return (<ShowWallet {...pageProps} />);
        case 'takePhoto':
          return (<TakePhoto {...pageProps} /> )
        case 'uploadPhoto':
          return (<UploadPhoto {...pageProps} /> )
        default:
          throw new Error(`Unknown stage '${this.state.stage}'`);
      }
    }
    catch (err) {
      return (<Error err={err} reset={this.state.navigationMethods.reset} />)
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
