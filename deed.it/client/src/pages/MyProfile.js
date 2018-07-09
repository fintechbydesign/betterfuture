import React, { Component } from 'react';
import BadgeIcon from '../components/BadgeIcon';
import Button from '../components/Button';
import DeedSummary from '../components/DeedSummary';
import ProgressBar from '../components/ProgressBar';
import startDeed from '../components/startDeed';
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
    const { fetchError, user } = this.props;
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
      fetchError({err});
    }
  }

  async doDeedAgain (deed) {
    const { error, exhort, user } = this.props;
    const fakeDeedType = {
      id: deed.deedTypeId
    };
    await startDeed(user, fakeDeedType, { error, exhort });
    this.fetchDeeds();
  }

  renderBadges () {
    const { badge } = this.props;
    const { events } = this.state;
    const badges = events.filter((event) => event.type = 'badge').map((event, index) => {
      const { src } = event;
      const props = {
        ...event,
        imageClassName: 'MyProfile-badge',
        key: index,
        onClick: badge.bind(null, { src })
      };
      return (<BadgeIcon {...props} />);
    });
    if (badges.length === 0) {
      return null;
    } else {
      return (
        <div>
          <Title text='Badges' />
          <div className='flexContainerRow MyProfile-badge-container'>
            {badges}
          </div>
        </div>
      );
    }
  }

  renderInProgressDeed (deed, index) {
    const { evidence } = this.props;
    const { inProgress } = this.state.deeds;
    const expand = (inProgress.length === 1);
    const props = {
      buttonText: "I've done it",
      deed,
      expand,
      key: index,
      onButtonClick: evidence.bind(null, { deed })
    };
    return (
      <DeedSummary {...props} />
    );
  }

  renderInProgress () {
    const { pickADeed } = this.props;
    const { inProgress } = this.state.deeds;
    if (inProgress && inProgress.length > 0) {
      const summaries = inProgress.map(this.renderInProgressDeed);
      return summaries;
    } else {
      return (
        <div className='MyProfile-InProgress'>
          <Text text='You have no current deed' />
          <Button onClick={pickADeed} text='Pick a deed' />
        </div>
      );
    }
  }

  renderPreviousDeed (deed, index) {
    const { picture } = this.props;
    const { inProgress } = this.state.deeds;
    const { src } = deed;
    const userHasInProgressDeed = (inProgress && inProgress.length > 0);
    const props = {
      buttonText: 'Do it again',
      deed,
      hideButton: userHasInProgressDeed,
      onImageClick: (src) ? picture.bind(null, { src, type: 'userImage' }) : null,
      key: index,
      onButtonClick: this.doDeedAgain.bind(this, deed)
    };
    return (
      <DeedSummary {...props} />
    );
  }

  renderPrevious () {
    const { completed, rejected, unapproved } = this.state.deeds;
    const all = [...unapproved, ...completed, ...rejected];
    if (all.length === 0) {
      return null;
    }
    const previousDeeds = all.map(this.renderPreviousDeed);

    return (<div>
      <Title text='Previous Deeds' />
      {previousDeeds}
    </div>);
  }

  render () {
    const { deeds } = this.state;
    const { user } = this.props;

    if (!deeds) {
      const progressProps = {
        duration: 3000,
        infinite: true,
        style: {
          fontSize: 'large'
        },
        text: 'Fetching your deeds...'
      };
      return (<ProgressBar {...progressProps} />);
    }

    return (
      <div className='page'>
        <UserSummary {...user} />
        {this.renderBadges()}
        <Title text='In Progress' />
        {this.renderInProgress()}
        {this.renderPrevious()}
      </div>
    );
  }
}

export default MyProfile;
