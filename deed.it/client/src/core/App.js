/*
  Core application flow logic held here:
  - each page has a page name, a React component and state validation logic (all in pages.js)
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
import Error from '../pages/Error.js';
import GlobalNav from '../components/GlobalNav';
import PageHeader from '../components/PageHeader';
import './global.css';

class App extends Component {
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
    const { pages } = this.props;
    const baseNavigationMethod = (pageName, nextPageProps) => {
      this.setState({...this.state, nextPageProps, pageName, user: getLocalUser()});
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
    const { pages } = this.props;
    const { pageName, user } = this.state;
    const pageMetaData = pages[pageName];
    if (pageMetaData) {
      if (pageMetaData.isStateValid(user)) {
        const Page = pageMetaData.component;
        return (<Page {...pageProps} />);
      } else {
        return (<Error err={`Invalid page state: '${pageName}': '${JSON.stringify(this.state, null, 2)}'`} />);
      }
    } else {
      return (<Error err={`Unknown page: '${pageName}'`} />);
    }
  }

  render () {
    const { navigationMethods, nextPageProps, user } = this.state;
    const pageProps = { ...navigationMethods, ...nextPageProps, user };
    return (
      <div className='flexContainerColumn fullHeight'>
        <PageHeader />
        { this.selectPage(pageProps) }
        <GlobalNav {...pageProps} />
      </div>
    );
  }
}

export default App;
