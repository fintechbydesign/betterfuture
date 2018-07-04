/*
  Core application flow logic held here:
  - each page has a page name and a React component
  - 'a navigation method' is created for each page
  - this method:
    1. clears old page-specific state
    2. updates the user state with the latest from the user repo
    3. records any properties to be passed
    4. setState(...) to redraw
  - most navigation methods are generic; there are some special cases
  - all navigation methods, along with the user state are passed as props to all pages
 */

import React, { Component } from 'react';
import { createLocalUser, getLocalUser, removeLocalUser, removeUser } from '../data/user';
import { unregister } from '../core/registerServiceWorker';
import AboutUs from './AboutUs';
import Badge from './Badge';
import CompleteDeed from './CompleteDeed';
import DeeditDifference from './DeeditDifference';
import Error from './Error.js';
import Evidence from './Evidence';
import FetchError from './FetchError';
import GlobalNav from '../components/GlobalNav';
import Home from './Home';
import PageHeader from '../components/PageHeader';
import MyProfile from './MyProfile';
import PickADeed from './PickADeed';
import Picture from './Picture';
import Pledge from './Pledge';
import Privacy from './Privacy';
import Register from './Register';
import TakePhoto from './TakePhoto';
import TermsAndConditions from './TermsAndConditions';
import UpdateAvailable from './UpdateAvailable';
import UploadPhoto from './UploadPhoto';
import './Pages.css';

const pages = {
  'aboutUs': AboutUs,
  'badge': Badge,
  'completeDeed': CompleteDeed,
  'deeditDifference': DeeditDifference,
  'evidence': Evidence,
  'error': Error,
  'fetchError': FetchError,
  'home': Home,
  'myProfile': MyProfile,
  'pickADeed': PickADeed,
  'picture': Picture,
  'pledge': Pledge,
  'privacy': Privacy,
  'register': Register,
  'takePhoto': TakePhoto,
  'termsAndConditions': TermsAndConditions,
  'updateAvailable': UpdateAvailable,
  'uploadPhoto': UploadPhoto
};

// const statelessPages = ['aboutUs', 'deeditDifference', 'home', 'pickADeed', 'termsAndConditions'];

class Pages extends Component {
  constructor (props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
    this.state = this.createInitialState();
    this.state.navigationMethods = this.createNavigationMethods();
    if (window.history) {
      this.updateHistory();
      window.onpopstate = this.interceptBackButton.bind(this);
    }
  }

  createInitialState () {
    return {
      pageName: 'home',
      user: getLocalUser()
    };
  }

  updateHistory () {
    if (window.history) {
      const { pageName } = this.state;
      window.history.pushState({ pageName }, pageName);
    }
  }

  interceptBackButton (event) {
    /*
    const { pageName } = event.state;
    const previousPage = statelessPages.includes(pageName) ? pageName : 'home';
    */
    this.state.navigationMethods['home']();
  }

  async reset () {
    const { error } = this.state.navigationMethods;
    try {
      const { user } = this.state;
      if (user.nickname) {
        await removeUser(user);
      }
      removeLocalUser();
      createLocalUser();
      unregister();
      this.setState(this.createInitialState());
    } catch (err) {
      error({err});
    }
  }

  createNavigationMethods () {
    const baseNavigationMethod = (pageName, nextPageProps) => {
      this.updateHistory();
      this.setState({...this.state, nextPageProps, pageName, user: getLocalUser()});
      window.scrollTo(0, 0);
    };
    const navigationMethods = {};
    Object.keys(pages).forEach((pageName) => {
      navigationMethods[pageName] = baseNavigationMethod.bind(null, pageName);
    });
    navigationMethods.reset = this.reset;
    navigationMethods.notImplemented = () => {
      alert('Not implemented');
    };
    return navigationMethods;
  }

  selectPage (pageProps) {
    const { pageName } = this.state;
    const Page = pages[pageName];
    if (Page) {
      return (<Page {...pageProps} />);
    } else {
      return (<Error err={`Unknown page: '${pageName}'`} />);
    }
  }

  render () {
    const { navigationMethods, nextPageProps, user } = this.state;
    const pageProps = { ...navigationMethods, ...nextPageProps, user };
    return (
      <div className='flexContainerColumn Pages-container'>
        <PageHeader {...pageProps} />
        { this.selectPage(pageProps) }
        <GlobalNav {...pageProps} />
      </div>
    );
  }
}

export default Pages;
