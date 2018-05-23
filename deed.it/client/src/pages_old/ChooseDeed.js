import React, { Component } from 'react';
import Button from '../components/Button.js';
import Title from '../components/Title.js';
import { getAvailableDeeds } from '../stores/deeds.js';
import { updateUser } from '../stores/user.js';


class ChooseDeed extends Component { 

  constructor (props) {
    super(props);
    this.createDeedButton = this.createDeedButton.bind(this);
  }

  componentDidMount () {
    this.props.user.deedId = undefined;
    updateUser(this.props.user)
  }

  createDeedButton (deed) {
    const click = () => {
      this.props.user.deedId = deed.id;
      updateUser(this.props.user)
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
        <Title text='Choose the deed you wish to do:' />
        { deeds.map(this.createDeedButton) }
      </div>
    );
  }
}

export default ChooseDeed;
