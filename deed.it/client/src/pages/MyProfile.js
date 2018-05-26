import React, { Component } from 'react';
import Button from '../components/Button';
import DeedSummary from '../components/DeedSummary';
import Fetching from '../components/Fetching';
import Text from '../components/Text';
import Title from '../components/Title';
import Wonderwall from '../components/WonderWall';
import { getUserDeeds } from '../data/deeds';
import { updateLocalUser } from '../data/user';

const methods = ['fetchDeeds', 'renderInProgress'];

class MyProfile extends Component {
  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = {
      current: null,
      deeds: null,
      events: null
    };
  }

  componentDidMount () {
    const { deeds } = this.state;
    if (!deeds) {
      this.fetchDeeds();
    }
  }

  async fetchDeeds () {
    try {
      const { user } = this.props;
      const { current, approved, unapproved, events } = await getUserDeeds(user);
      updateLocalUser({
        ...user,
        deeds: {
          ...user.deeds,
          current
        }
      });
      this.setState({
        ...this.state,
        current,
        deeds: {
          approved,
          unapproved
        },
        events
      });
    } catch (err) {
      this.props.error(err);
    }
  }

  renderInProgress () {
    const { current } = this.state;
    if (current) {
      return (
        <div>
          <DeedSummary {...current} />
          <Button click={this.props.evidence} text="I've done it" />
        </div>
      );
    } else {
      return (
        <div>
          <Text text='You have no current deed' />
          <Button click={this.props.pickADeed} text='Pick a deed' />
        </div>
      );
    }
  }

  render () {
    const { deeds } = this.state;
    if (!deeds) {
      return (<Fetching text='Fetching your deeds' />);
    }
    const { username, personal } = this.props.user;
    const { country } = personal;
    return (
      <div className='page'>
        <Title text={username} />
        <Text text={country} />
        <Text text='Badges' />
        <Text text='Trophies' />
        <Title text='In Progress' />
        {this.renderInProgress()}
        <Title text='Previous Deeds' />
        <Wonderwall />
      </div>
    );
  }
}

export default MyProfile;
