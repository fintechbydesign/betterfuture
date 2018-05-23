/*
  Core application flow logic held here:
  - each page has a page name, a React component and state validation logic (all in pages.js)
  - 'a navigation method' is created for each page
  - this method:
    1. clears old page-specific state
    2. updates the user state with the latest from the user repo
    3. setState(...) to redraw
  - most navigation methods are generic; the error page has its own and there is an additional 'reset' method
  - all navigation methods, along with the user state are passed as props to all pages
 */

import React, { Component } from 'react';
import { createLocalUser, getLocalUser, removeUser } from "../data/user";
import Error from '../pages/Error.js';
import GlobalNav from '../components/GlobalNav';
import PageHeader from '../components/PageHeader';
import pages from '../pages/pages';
import './global.css';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = this.createInitialState();
    this.state.navigationMethods = this.createNavigationMethods();
  }

  createInitialState () {
    try {
      const user = getLocalUser();
      return {
        pageName: user.deeds.current ? 'home' : 'pickADeed',
        user
      };
    } catch (err) {
      return {
        pageName: 'pickADeed',
        user: createLocalUser()
      };
    }
  }

  createNavigationMethods () {
    const baseNavigationMethod = (pageName) => {
      console.log(`Setting page ${pageName}`);
      // remove nextPageProps and update user
      const { nextPageProps, ...oldState } = this.state;
      this.setState({...oldState, pageName,  user: getLocalUser()});
    }
    const navigationMethods = {};
    Object.keys(pages).forEach((pageName) => {
      navigationMethods[pageName] = baseNavigationMethod.bind(null, pageName);
    });
    navigationMethods.error = (err) => {
      console.log(`Reporting error ${err}`);
      this.setState({...this.state, nextPageProps: { err }, pageName: 'error', user: getLocalUser()});
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
    const pageMetaData = pages[this.state.pageName];
    if (pageMetaData) {
      if (pageMetaData.isStateValid(this.state.user)) {
        const Page = pageMetaData.component;
        return (<Page {...pageProps} />);
      } else {
        return (<Error err={`Invalid page state: '${this.state.pageName}': '${JSON.stringify(this.state, null, 2)}'`} />)
      }
    } else {
      return (<Error err={`Unknown page: '${this.state.pageName}'`} />)
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
