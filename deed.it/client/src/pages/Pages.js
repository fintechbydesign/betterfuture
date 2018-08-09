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
import {createLocalUser, getLocalUser, registerUser, removeLocalUser, removeUser} from '../data/user';
import defaultPreApprovedUser from '../data/defaultPreApprovedUser';
import { unregister } from '../core/registerServiceWorker';
import AboutUs from './AboutUs';
import Badge from './Badge';
import CompleteDeed from './CompleteDeed';
import DeeditDifference from './DeeditDifference';
import Error from './Error.js';
import Evidence from './Evidence';
import Exhort from './Exhort';
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
  'exhort': Exhort,
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

class Pages extends Component {
  constructor (props) {
    super(props);
    this.back = this.back.bind(this);
    this.reset = this.reset.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
    this.state = this.createInitialState();
    this.state.navigationMethods = this.createNavigationMethods();
    if(window.history) {
      this.updateHistory();
      window.onpopstate = this.interceptBackButton.bind(this);
    }
  }

  createInitialState () {
    return {
      pageName: 'home',
      user: getLocalUser(),
      previousPage: null
    };
  }

  createNavigationMethods () {
    const baseNavigationMethod = (pageName, nextPageProps, clearPreviousPage) => {
      this.setState({
        ...this.state,
        nextPageProps,
        pageName,
        previousPage: this.updateHistory(clearPreviousPage),
        user: getLocalUser()
      });
      window.scrollTo(0, 0);
    };
    const navigationMethods = {};
    Object.keys(pages).forEach((pageName) => {
      navigationMethods[pageName] = baseNavigationMethod.bind(null, pageName);
    });
    navigationMethods.back = this.back;
    navigationMethods.reset = this.reset;
    navigationMethods.notImplemented = () => {
      alert('Not implemented');
    };
    return navigationMethods;
  }

  interceptBackButton (event) {
    this.back();
  }

  updateHistory (clearPreviousPage) {
    const { pageName, nextPageProps } = this.state;
    if (window.history) {
      window.history.pushState(pageName, pageName);
    }
    return (clearPreviousPage) ? null : { pageName, nextPageProps };
  }

  back () {
    const { navigationMethods, previousPage } = this.state;
    if (previousPage) {
      const { pageName, nextPageProps } = previousPage;
      navigationMethods[pageName](nextPageProps, true);
    } else {
      this.state.navigationMethods['home'](null, true);
    }
  }

  async reset () {
    const { state } = this;
    const { navigationMethods, user } = state;
    const { error } = navigationMethods;
    const isPreApprovedUser = (user.nickname === defaultPreApprovedUser.nickname);
    try {
      if (user.nickname && !isPreApprovedUser) {
        await removeUser(user);
      }
      removeLocalUser();
      if (isPreApprovedUser) {
        await registerUser({
          ...createLocalUser(),
          ...defaultPreApprovedUser
        });
      } else {
        unregister();
      }
      this.setState(this.createInitialState());
    } catch (err) {
      error({err});
    }
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
