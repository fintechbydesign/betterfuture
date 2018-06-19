import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import getLocation from '../data/location';
import { prepareUpload } from '../data/S3';
import { getUserDeeds, updateDeed, REFRESH } from '../data/deeds';
import { createEvent } from '../data/events';
import { updateLocalUser } from "../data/user";

const methods = ['completeDeed', 'createNewEvents', 'createUploadArtifacts'];

class CompleteDeedProgress extends Component {

  constructor (uploadProgress) {
    super();
    this.updateProgress = this.updateProgress.bind(this);
    if (uploadProgress) {
      uploadProgress.on('httpUploadProgress', this.updateProgress);
    }
  }

  updateProgress (progress) {
    const { loaded, total } = progress;
    const percentage = Math.round( 60 * loaded / total );  // max 60%
    this.setProgress(percentage, 'Uploading your evidence...');
  }
}

class CompleteDeed extends Component {

  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
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

  /* eslint no-unused-vars:0 */
  async completeDeed () {
    const { deed, imageData, location, navigateFns, user } = this.props;
    try {
      const { imageName, uploadProgress, uploadPromise } = await this.createUploadArtifacts(deed, imageData);
      const progress = new CompleteDeedProgress(uploadProgress);
      navigateFns.uploading({progress});
      const [locationResult, uploadResult] = await Promise.all([location, uploadPromise]);
      progress.setProgress(60, 'Updating deed...');
      await updateDeed({
        ...deed,
        ...locationResult,
        evidenceType: (imageData) ? 'photo' : '',
        src: imageName,
        status: (imageData) ? 'unapproved' : 'completed'
      });
      progress.setProgress(70, 'Awarding badges...');
      await this.createNewEvents();
      // update user deeds before showing profile
      await getUserDeeds(user, REFRESH);
      progress.setProgress(80, 'Updating your profile...');
      navigateFns.myProfile();
    } catch (err) {
      navigateFns.error({err});
    }
  }

  render () {
    return (
      <Button click={this.completeDeed} text={this.props.text} />
    );
  }
}

CompleteDeed.propTypes = {
  deed: PropTypes.object.isRequired,
  imageData: PropTypes.string,
  navigateFns: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
}

export default CompleteDeed;