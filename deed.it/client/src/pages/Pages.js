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
import AboutUs from "../pages/AboutUs";
import Badge from '../pages/Badge';
import CompleteDeed from "../pages/CompleteDeed";
import DeeditDifference from "../pages/DeeditDifference";
import Error from '../pages/Error.js';
import Evidence from "../pages/Evidence";
import GlobalNav from '../components/GlobalNav';
import Home from "../pages/Home";
import PageHeader from '../components/PageHeader';
import MyProfile from "../pages/MyProfile";
import PickADeed from "../pages/PickADeed";
import Picture from "../pages/Picture";
import Pledge from "../pages/Pledge";
import Privacy from "../pages/Privacy";
import Register from "../pages/Register";
import TakePhoto from "../pages/TakePhoto";
import TermsAndConditions from "../pages/TermsAndConditions";
import UploadPhoto from "../pages/UploadPhoto";
import './Pages.css';

const pages = {
  'aboutUs': AboutUs,
  'badge': Badge,
  'completeDeed': CompleteDeed,
  'deeditDifference': DeeditDifference,
  'evidence': Evidence,
  'error': Error,
  'home': Home,
  'myProfile': MyProfile,
  'pickADeed': PickADeed,
  'picture': Picture,
  'pledge': Pledge,
  'privacy': Privacy,
  'register': Register,
  'takePhoto': TakePhoto,
  'termsAndConditions': TermsAndConditions,
  'uploadPhoto': UploadPhoto
};

class Pages extends Component {
  constructor (props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.state = this.createInitialState();
    this.state.navigationMethods = this.createNavigationMethods();
  }

  createInitialState () {
    return {
      pageName: 'home',
      user: getLocalUser()
    };
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
      this.setState(this.createInitialState());
    } catch (err) {
      error({err});
    }
  }

  createNavigationMethods () {
    const baseNavigationMethod = (pageName, nextPageProps) => {
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
