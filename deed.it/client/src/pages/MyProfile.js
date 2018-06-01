import React, { Component } from 'react';
import Button from '../components/Button';
import DeedSummary from '../components/DeedSummary';
import Fetching from '../components/Fetching';
import Text from '../components/Text';
import Title from '../components/Title';
import Wonderwall from '../components/WonderWall';
import { getUserDeeds } from '../data/deeds';
import { updateLocalUser } from '../data/user';

const methods = ['fetchDeeds', 'renderInProgress', 'renderInProgressDeed', 'renderPrevious'];

class MyProfile extends Component {
  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = {
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
    const { error, user } = this.props;
    try {
      const { completed, rejected, unapproved, events, inProgress } = await getUserDeeds(user);
      this.setState({
        ...this.state,
        deeds: {
          completed,
          rejected,
          unapproved,
          inProgress
        },
        events
      });
    } catch (err) {
      error({err});
    }
  }

  renderInProgressDeed (deed, index) {
    const { evidence, user } = this.props;
    const click = () => {
      updateLocalUser({
        ...user,
        selected: {
          deed
        }
      })
      evidence();
    };
    return (
      <div key={index}>
        <DeedSummary key={index} {...deed} />
        <Button click={click} text="I've done it" />
      </div>
    )
  }


  renderInProgress () {
    const { pickADeed } = this.props;
    const { inProgress } = this.state.deeds;
    if (inProgress && inProgress.length > 0) {
      const summaries = inProgress.map(this.renderInProgressDeed);
      return summaries;
    } else {
      return (
        <div>
          <Text text='You have no current deed' />
          <Button click={pickADeed} text='Pick a deed' />
        </div>
      );
    }
  }

  renderPrevious () {
    const { completed, rejected, unapproved } = this.state.deeds;
    const all = [...unapproved, ...completed, ...rejected];
    const summaries = all.map((deed, index) => (<DeedSummary key={index} {...deed} />));
    return summaries;
  }

  render () {
    const { deeds } = this.state;
    if (!deeds) {
      return (<Fetching text='Fetching your deeds' />);
    }
    const { nickname, personal } = this.props.user;
    const { city, country } = personal;
    const location = (city) ? `${city}, ${country}` : country;
    return (
      <div className='page'>
        <Title text={nickname} />
        <Text text={location} />
        <Text text='Badges' />
        <Text text='Trophies' />
        <Title text='In Progress' />
        {this.renderInProgress()}
        <Title text='Previous Deeds' />
        {this.renderPrevious()}
        <Wonderwall />
      </div>
    );
  }
}

export default MyProfile;
