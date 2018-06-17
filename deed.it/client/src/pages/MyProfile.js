import React, { Component } from 'react';
import Badge from '../components/Badge';
import Button from '../components/Button';
import DeedSummary from '../components/DeedSummary';
import ProgressBar from '../components/ProgressBar';
import  startDeed from '../components/startDeed';
import Text from '../components/Text';
import Title from '../components/Title';
import UserSummary from '../components/UserSummary';
import { getUserDeeds } from '../data/deeds';
import './MyProfile.css';

const methods = [
  'doDeedAgain',
  'fetchDeeds',
  'renderBadges',
  'renderInProgress',
  'renderInProgressDeed',
  'renderPrevious',
  'renderPreviousDeed'
];

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

  renderBadges () {
    const { events } = this.state;
    const badges = events.filter((event) => event.type = 'badge').map((event, index) => {
      return (<div key={index}><Badge {...event} /></div>);
    });
    if (badges.length === 0) {
      return (<Text text='None yet!' />);
    } else {
      return (
        <div className='flexContainerRow'>
          {badges}
        </div>
      );
    }
  }

  renderInProgressDeed (deed, index) {
    const { evidence } = this.props;
    const { inProgress } = this.state.deeds;
    const expand = (inProgress.length === 1);
    const onClick = () => {
      evidence({ deed });
    };
    return (
      <DeedSummary buttonText="I've done it" deed={deed} expand={expand} key={index} onClick={onClick} />
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
        <div  className='MyProfile-InProgress'>
          <Text text='You have no current deed' />
          <Button onClick={pickADeed} text='Pick a deed' />
        </div>
      );
    }
  }

  async doDeedAgain (deed) {
    const { error, myProfile, user } = this.props;
    const fakeDeedType = {
      id: deed.deedTypeId
    };
    await startDeed(user, fakeDeedType, { error, myProfile });
    // TODO - minimise state
    this.fetchDeeds();
  }

  renderPreviousDeed (deed, index) {
    const { inProgress } = this.state.deeds;
    const props = {
      deed,
      key: index
    };
    if (inProgress && inProgress.length > 0) {
      props.hideButton = true;
    } else {
      props.buttonText = "Do it again!";
      props.onClick = this.doDeedAgain.bind(this, deed);
    }
    return (
      <DeedSummary {...props} />
    )
  }

  renderPrevious () {
    const { completed, rejected, unapproved } = this.state.deeds;
    const all = [...unapproved, ...completed, ...rejected];
    return all.map(this.renderPreviousDeed);
  }

  render () {
    const { deeds } = this.state;
    if (!deeds) {
      const progressProps = {
        duration: 3000,
        style: {
          'font-size': 'large'
        },
        text: 'Fetching your deeds...'
      };
      return (<ProgressBar { ...progressProps } />);
    }
    const { user } = this.props;
    return (
      <div className='page'>
        <UserSummary {...user} />
        <Title text='Badges' />
        {this.renderBadges()}
        <Title text='In Progress' />
        {this.renderInProgress()}
        <Title text='Previous Deeds' />
        {this.renderPrevious()}
      </div>
    );
  }
}

export default MyProfile;
