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

const pages = {
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
    this.state = this.createInitialState();
    this.state.navigationMethods = this.createNavigationMethods();
  }

  createInitialState () {
    let page;
    let user;
    try {
      user = getUser();
      page = user.deeds.current ? 'home' : 'pickADeed';
    } catch (err) {
      user = createUser();
      page = 'pickADeed';
    }
    return { page, user };
  }

  createNavigationMethods () {
    const baseNavigationMethod = (page) => {
      console.log(`Setting page ${page}`);
      const { nextPageProps, ...oldState } = this.state;
      this.setState({...oldState, page});
    }
    const navigationMethods = {};
    Object.keys(pages).forEach((page) => {
      navigationMethods[page] = baseNavigationMethod.bind(null, page);
    });
    navigationMethods.error = (err) => {
      console.log(`Reporting error ${err}`);
      this.setState({...this.state, page: 'error', nextPageProps: { err } });
    }
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
    const Page = pages[this.state.page];
    if (Page) {
      return (<Page {...pageProps} />);
    } else {
      return (<Error err={`Unknown page '${this.state.page}'`} />)
    }
  };

  render() {
    const pageProps = { ...this.state.navigationMethods, ...this.state.nextPageProps, user: this.state.user };
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
