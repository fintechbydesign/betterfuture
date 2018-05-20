import React, { Component } from 'react';
import { createUser, getUser, removeUser } from "../stores/user";
import AboutUs from '../pages/AboutUs';
import ChooseDeed from '../pages/ChooseDeed.js';
import ChooseReward from '../pages/ChooseReward.js';
import CompleteDeed from '../pages/CompleteDeed.js';
import DisplayDeed from '../pages/DisplayDeed.js';
import Error from '../pages/Error.js';
import GlobalNav from '../components/GlobalNav';
import PageHeader from '../components/PageHeader';
import Home from '../pages/Home';
import MyProfile from '../pages/MyProfile';
import PickADeed from '../pages/PickADeed';
import Register from '../pages/Register';
import ShowWallet from '../pages/ShowWallet';
import StartDeed from '../pages/StartDeed';
import TakePhoto from '../pages/TakePhoto';
import TermsAndConditions from '../pages/TermsAndConditions';
import UploadPhoto from '../pages/UploadPhoto';
import Welcome from '../pages/Welcome';
import WelcomeBack from '../pages/WelcomeBack';
import './global.css';

const stages = {
  'aboutUs': AboutUs,
  'chooseDeed': ChooseDeed,
  'chooseReward': ChooseReward,
  'completeDeed': CompleteDeed,
  'displayDeed': DisplayDeed,
  'error': Error,
  'home': Home,
  'myProfile': MyProfile,
  'pickADeed' : PickADeed,
  'register': Register,
  'showWallet': ShowWallet,
  'startDeed': StartDeed,
  'takePhoto': TakePhoto,
  'termsAndConditions': TermsAndConditions,
  'uploadPhoto': UploadPhoto,
  'welcome': Welcome,
  'welcomeBack': WelcomeBack,
};

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
      stage = user.deeds.current ? 'home' : 'pickADeed';
    } catch (err) {
      user = createUser();
      stage = 'pickADeed';
    }
    return { stage, user };
  }

  createNavigationMethods () {
    const baseNavigationMethod = (stage) => {
      console.log(`Setting stage ${stage}`);
      this.setState({...this.state, stage});
    }
    const navigationMethods = {};
    Object.keys(stages).forEach((stage) => {
      navigationMethods[stage] = baseNavigationMethod.bind(null, stage);
    });
    navigationMethods.reset = () => {
      removeUser();
      this.setState(this.createInitialState());
    };
    navigationMethods.notImplemented = () => {
      alert('Not implemented');
    }
    return navigationMethods;
  }

  selectPage (pageProps) {
    const Page = stages[this.state.stage];
    if (Page) {
      return (<Page {...pageProps} />);
    } else {
      return (<Error err={`Unknown stage '${this.state.stage}'`} reset={this.state.navigationMethods.reset} />)
    }
  };

  render() {
    const pageProps = { ...this.state.navigationMethods, user: this.state.user };
    return (
      <div className='flexContainerColumn'>
        <PageHeader />
        { this.selectPage(pageProps) }
        <GlobalNav {  ...pageProps} />
      </div>
    );
  }
}

export default App;
