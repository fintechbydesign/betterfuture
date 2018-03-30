import React, { Component } from 'react';
import Button from '../components/Button.js';
import Header from '../components/Header.js';
import { getAvailableDeeds } from '../stores/deeds.js';
import { setUserProps } from '../stores/user.js';


class ChooseDeed extends Component { 

  constructor (props) {
    super(props);
    this.createDeedButton = this.createDeedButton.bind(this);
  }

  componentDidMount () {
    setUserProps({ deedId: undefined })
  }

  createDeedButton (deed) {
    const click = () => {
      setUserProps({ deedId: deed.id })
      this.props.displayDeed();
    };
    return (
      <div key={deed.id}>
        <Button click={click} text={deed.display} />
      </div>
    );
  }

  render() {
    const deeds = getAvailableDeeds();     
    return (
      <div>
        <Header text='Choose the deed you wish to do:' />
        { deeds.map(this.createDeedButton) }
      </div>
    );
  }
}

export default ChooseDeed;
