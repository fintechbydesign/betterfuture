import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import getLocation from '../data/location';
import { prepareUpload } from '../data/S3';
import { getUserDeeds, updateDeed, REFRESH } from '../data/deeds';

const methods = ['completeDeed', 'createUploadArtifacts', 'toggleRecordLocation'];

class CompleteDeed extends Component {

  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = {
      recordLocation: true
    }
  }

  toggleRecordLocation () {
    this.setState({
      ...this.state,
      recordLocation: !this.state.recordLocation
    });
  }

  async createUploadArtifacts () {
    const { deed, imageData } = this.props;
    if (imageData) {
      const upload = await prepareUpload(deed, imageData);
      const uploadPromise = upload.promise();
      return { upload, uploadPromise };
    } else {
      return { uploadPromise:  Promise.resolve() };
    }
  }

  async completeDeed () {
    const { deed, imageData, navigateFns, user } = this.props;
    const { recordLocation } = this.state;
    try {
      const { upload, uploadPromise } = await this.createUploadArtifacts(deed, imageData);
      const locationPromise = recordLocation ? getLocation(deed) : Promise.resolve();
      navigateFns.uploading(upload);
      const [ coords ] = await Promise.all([locationPromise, uploadPromise]);
      await updateDeed({
        ...deed,
        location: coords,
        status: (imageData) ? 'approved' : 'unapproved'
      });
      // update user deeds before showing profile
      await getUserDeeds(user, REFRESH);
      navigateFns.myProfile();
    } catch (err) {
      navigateFns.error(err);
    }
  }

  render () {
    const { recordLocation } = this.state;
    return (
      <div>
        <Button click={this.completeDeed} text={this.props.text} />
        <div>
          <input type='checkbox' id='location' onChange={this.toggleRecordLocation} checked={recordLocation} />
          <label htmlFor="location">Record your current location?</label>
        </div>
      </div>
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