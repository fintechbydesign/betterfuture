import React, { Component } from 'react';
import { createUser, getUser, removeUser } from "../stores/user";
import AboutUs from '../pages/AboutUs';
import ChooseDeed from '../pages/ChooseDeed.js';
import ChooseReward from '../pages/ChooseReward.js';
import CompleteDeed from '../pages/CompleteDeed.js';
import DisplayDeed from '../pages/DisplayDeed.js';
import Error from '../pages/Error.js';
import GlobalNav from '../components/GlobalNav';
import Header from '../components/Header';
import Home from '../pages/Home';
import Register from '../pages/Register.js';
import ShowWallet from '../pages/ShowWallet.js';
import TakePhoto from '../pages/TakePhoto.js';
import TermsAndConditions from '../pages/TermsAndConditions';
import UploadPhoto from '../pages/UploadPhoto.js';
import Welcome from '../pages/Welcome.js';
import WelcomeBack from '../pages/WelcomeBack.js';
import './global.css';

const stages = [
  'aboutUs',
  'chooseDeed',
  'chooseReward',
  'completeDeed',
  'displayDeed',
  'home',
  'register',
  'showWallet',
  'takePhoto',
  'termsAndConditions',
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
        case 'home':
          return (<Home {...pageProps} />);
        case 'showWallet':
          return (<ShowWallet {...pageProps} />);
        case 'takePhoto':
          return (<TakePhoto {...pageProps} /> );
        case 'termsAndConditions':
          return (<TermsAndConditions {...pageProps} />);
        case 'uploadPhoto':
          return (<UploadPhoto {...pageProps} /> )
        case 'aboutUs' :
          return (<AboutUs {...pageProps} />)
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
      <div className='flexContainerColumn'>
        <Header />
        { this.selectPage() }
        <GlobalNav { ...this.state.navigationMethods} />
      </div>
    );
  }
}

export default App;
