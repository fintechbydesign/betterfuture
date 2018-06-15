import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Image from '../components/Image';
import ProgressBar from '../components/ProgressBar';
import Text from '../components/Text';
import Thanks from '../components/Thanks';
import Title from '../components/Title';
import { prepareUpload } from "../data/S3";
import { getUserDeeds, REFRESH, updateDeed } from "../data/deeds";
import { updateLocalUser } from "../data/user";
import { createEvent } from "../data/events";
import './CompleteDeed.css';

const texts = [
  'Smashing it! See how all the good deeds being done are making a big impact in Edinburgh',
  'You\'re on a roll... there are still more deeds to be done!'
];

const methods = ['createNewEvents', 'createUploadArtifacts'];

class CompleteDeed extends Component {

  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = {
      percent: 50
    }
  }

  async createUploadArtifacts () {
    const { deed, imageData } = this.props;
    if (imageData) {
      const imageName = `${deed.id}.png`;
      const uploadProgress = await prepareUpload(deed, imageName, imageData);
      const uploadPromise = uploadProgress.promise();
      return { imageName, uploadProgress, uploadPromise };
    } else {
      return { uploadPromise:  Promise.resolve() };
    }
  }

  async createNewEvents()  {
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
      // do nothing
    }
    return Promise.all(newEvents.map(createEvent));
  }

  async XcomponentDidMount () {
    const { deed, error, imageData, locationPromise, myProfile, user } = this.props;
    try {
      const { imageName, uploadProgress, uploadPromise } = await this.createUploadArtifacts(deed, imageData);
      const location = await locationPromise;
      await updateDeed({
        ...deed,
        ...location,
        evidenceType: (imageData) ? 'photo' : '',
        src: imageName,
        status: (imageData) ? 'unapproved' : 'completed'
      });
      updateLocalUser({
        ...user,
        selected: null
      });
      await this.createNewEvents();
      // update user deeds before showing profile
      await getUserDeeds(user, REFRESH);
      myProfile();
    } catch (err) {
      error({err});
    }
  }

  render () {
    const { deed, deeditDifference, imageData, pickADeed } = this.props;
    const { color, icon } = deed.style;
    const { percent } = this.state;
    const imageProps = {
      className: 'CompleteDeed-image',
      src: (imageData) ? imageData : icon
    };
    return (
      <div className='page'>
        <Title text='You Deed It!' />
        <Image {...imageProps} />
        <ProgressBar percent={percent} color={color} />
        <Text text={texts[0]} />
        <Button text='See how it all adds up' onClick={deeditDifference} />
        <Thanks deed={deed} />
        <Text text={texts[1]} />
        <Button text='Do another deed' onClick={pickADeed} />
      </div>
    );
  }
}

CompleteDeed.propTypes = {
  deed: PropTypes.object.isRequired,
  imageData: PropTypes.string
}

export default CompleteDeed;
