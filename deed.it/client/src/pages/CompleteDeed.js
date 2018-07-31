import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Image from '../components/Image';
import ProgressBar from '../components/ProgressBar';
import Text from '../components/Text';
import Thanks from '../components/Thanks';
import Title from '../components/Title';
import badges from '../../../common/src/images/badges';
import { imageSuffix } from '../config/imageConstants';
import { prepareUpload } from '../data/S3';
import { getUserDeeds, REFRESH, updateDeed } from '../data/deeds';
import { createEvent } from '../data/events';
import './CompleteDeed.css';
import {updateLocalUser} from '../data/user';

const texts = [
  'Smashing it! See how all the good deeds being done are making a big impact in Edinburgh',
  'You\'re on a roll... there are still more deeds to be done!'
];

const methods = ['createNewEvents', 'createUploadArtifacts', 'setProgress', 'updateBadge'];

class CompleteDeed extends Component {
  constructor (props) {
    super(props);
    const { deed, imageData } = this.props;
    const { icon } = deed.style;
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = {
      badge: null,
      imageClass: 'fadein',
      imageSrc: (imageData) || icon,
      progressPercent: 0,
      progressText: 'Reporting deed done...'
    };
  }

  async createUploadArtifacts () {
    const { props, setProgress } = this;
    const { deed, imageData } = props;
    console.log('createUploadArtifacts imageData: ', imageData);
    if (imageData) {
      const imageName = `${deed.id}.${imageSuffix}`;
      const uploadProgress = await prepareUpload(deed, imageName, imageData);
      uploadProgress.on('httpUploadProgress', (progress) => {
        const { loaded, total } = progress;
        const percentage = Math.round(100 * loaded / total);
        setProgress(null, percentage);
      });
      const uploadPromise = uploadProgress.promise();
      return { imageName, uploadPromise };
    } else {
      return { uploadPromise: Promise.resolve() };
    }
  }

  async createNewEvents () {
    const { deed, user } = this.props;
    const { nickname, username } = user;
    const { id: deedId, superDeedId } = deed;
    const profile = await getUserDeeds(user);
    const { completed, rejected, unapproved } = profile;
    const all = [...unapproved, ...completed, ...rejected];
    const filtered = all.filter((deed) => deed.superDeedId === superDeedId);
    const newEvents = [];
    const eventProps = { deedId, eventType: 'badge', nickname, username };
    switch (filtered.length) {
      case 0: // first deed of this type
        newEvents.push({ src: `${superDeedId}_first`, ...eventProps });
        break;
      case 1: // second deed of this type
        newEvents.push({ src: `${superDeedId}_second`, ...eventProps });
        break;
      default:
        // either one at random
        if (Date.now() % 2 === 0) {
          newEvents.push({ src: `${superDeedId}_first`, ...eventProps });
        } else {
          newEvents.push({ src: `${superDeedId}_second`, ...eventProps });
        }
    }
    return Promise.all(newEvents.map(createEvent));
  }

  async componentDidMount () {
    const { props, setProgress } = this;
    const { deed, error, imageData, locationPromise, user } = props;
    try {
      const { imageName, uploadPromise } = await this.createUploadArtifacts(deed, imageData);
      const location = await locationPromise;
      setProgress('Updating the deed...', (imageData) ? 15 : 0);
      await updateDeed({
        ...deed,
        ...location,
        evidenceType: (imageData) ? 'photo' : '',
        src: imageName,
        status: (imageData) ? 'unapproved' : 'completed'
      });
      setProgress('Awarding badges...', (imageData) ? 30 : 0);
      const events = await this.createNewEvents();
      events.forEach((event, index) => {
        const badge = badges[event.src];
        setTimeout(this.updateBadge.bind(this, badge), index * 2000);
      });
      setProgress('Updating your profile...', (imageData) ? 45 : 0);
      // update user deeds before showing profile
      await getUserDeeds(user, REFRESH);
      updateLocalUser({
        ...user,
        openDeedCount: user.openDeedCount - 1
      });
      if (imageData) {
        setProgress('Uploading your photo...');
        await uploadPromise;
        setProgress(null, 100);
      } else {
        setProgress(null, 100);
      }
    } catch (err) {
      error({err});
    }
  }

  setProgress (text, percent) {
    const { state } = this;
    const { progressPercent, progressText } = state;
    const newProgress = (percent && percent > progressPercent) ? percent : progressPercent;
    const newText = (newProgress === 100) ? 'All done' : (text) || progressText;
    this.setState({
      ...state,
      progressPercent: newProgress,
      progressText: newText
    });
  }

  updateBadge (badge) {
    this.setState({
      ...this.state,
      badge
    });
  }

  render () {
    const { props, state } = this;
    const { deed, deeditDifference, pickADeed } = props;
    const { style, superDeedId } = deed;
    const { color } = style;
    const { badge, progressPercent, progressText, imageClass, imageSrc } = state;
    const imageProps = {
      className: `CompleteDeed-image ${imageClass}`,
      src: (badge) ? badge.icon : imageSrc,
      type: 'appImage'
    };
    const badgeText = (badge)
      ? (<Text className='CompleteDeed-badge-text' style={badge.style} text={badge.text} />)
      : null;
    const progressProps = {
      color,
      percent: progressPercent,
      text: progressText
    };
    const additionalText = (superDeedId === "Help Edinburgh's Homeless" ) ? <Text text={texts[1]} /> : null;
    return (
      <div className='page'>
        <Title text='You Deed It!' />
        <Image {...imageProps} />
        {badgeText}
        <ProgressBar {...progressProps} />
        <Text text={texts[0]} />
        <Button text='See how it all adds up' onClick={deeditDifference} />
        <Thanks deed={deed} />
        {additionalText}
        <Button text='Do another deed' onClick={pickADeed} />
      </div>
    );
  }
}

CompleteDeed.propTypes = {
  deed: PropTypes.object.isRequired,
  imageData: PropTypes.string
};

export default CompleteDeed;
