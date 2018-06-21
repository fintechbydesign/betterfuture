import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Image from '../components/Image';
import ProgressBar from '../components/ProgressBar';
import Text from '../components/Text';
import Thanks from '../components/Thanks';
import Title from '../components/Title';
import badgeImages from '../../../common/src/images/badgeImages';
import { prepareUpload } from "../data/S3";
import { getUserDeeds, REFRESH, updateDeed } from "../data/deeds";
import { createEvent } from "../data/events";
import './CompleteDeed.css';
import {updateLocalUser} from "../data/user";

const texts = [
  'Smashing it! See how all the good deeds being done are making a big impact in Edinburgh',
  'You\'re on a roll... there are still more deeds to be done!'
];

const methods = ['createNewEvents', 'createUploadArtifacts', 'setProgress', 'updateImage'];

class CompleteDeed extends Component {

  constructor (props) {
    super(props);
    const { deed, imageData } = this.props;
    const { icon } = deed.style;
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = {
      imageSrc: (imageData) ? imageData : icon,
      imageClass: 'fadein',
      progressPercent: 0,
      progressText: 'Reporting deed done...'
    }
  }

  async createUploadArtifacts () {
    const { props, setProgress } = this;
    const { deed, imageData } = props;
    if (imageData) {
      const imageName = `${deed.id}.png`;
      const uploadProgress = await prepareUpload(deed, imageName, imageData);
      uploadProgress.on('httpUploadProgress', (progress) => {
        const { loaded, total } = progress;
        const percentage = Math.round( 100 * loaded / total );
        setProgress(null, percentage);
      });
      const uploadPromise = uploadProgress.promise();
      return { imageName, uploadPromise };
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

  async componentDidMount () {
    const { props, setProgress } = this;
    const { deed, error, imageData, locationPromise, user } = props;
    try {
      const { imageName, uploadPromise } = await this.createUploadArtifacts(deed, imageData);
      const location = await locationPromise;
      await updateDeed({
        ...deed,
        ...location,
        evidenceType: (imageData) ? 'photo' : '',
        src: imageName,
        status: (imageData) ? 'unapproved' : 'completed'
      });
      setProgress('Awarding badges...');
      const events = await this.createNewEvents();
      events.forEach((event, index) => {
        setTimeout(this.updateImage.bind(this, badgeImages[event.src]), index * 2000 );
      })
      setProgress('Updating your profile...');
      // update user deeds before showing profile
      await getUserDeeds(user, REFRESH);
      updateLocalUser({
        ...user,
        openDeedCount: user.openDeedCount - 1
      });
      if (imageData) {
        setProgress('Uploading your photo...');
        await uploadPromise;
      }
    } catch (err) {
      error({err});
    }
  }

  setProgress (text, percent) {
    const { state } = this;
    const progressPercent = (percent) ? percent : state.progressPercent;
    const progressText = (progressPercent === 100)
      ? 'All done'
      : (text)
        ? text
        : state.progressText;
    this.setState({
      ...state,
      progressPercent,
      progressText
    });
  }

  updateImage (imageSrc) {
    this.setState({
      ...this.state,
      imageSrc
    });
  }

  render () {
    const { props, state } = this;
    const { deed, deeditDifference, pickADeed } = props;
    const { color } = deed.style;
    const { progressPercent, progressText, imageClass, imageSrc } = state;
    const imageProps = {
      className: `CompleteDeed-image ${imageClass}`,
      src: imageSrc,
      type: 'appImage'
    };
    const progressProps = {
      color,
      percent: progressPercent,
      text: progressText
    };
    return (
      <div className='page'>
        <Title text='You Deed It!' />
        <Image {...imageProps} />
        <ProgressBar {...progressProps} />
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
