import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import getLocation from '../data/location';
import { getUserDeeds, updateDeed, REFRESH } from '../data/deeds';
import { uploadImage } from '../data/S3';

const recordLocation = async(deed) => {
  const coords = await getLocation();
  if (coords) {
    const updated = {
      ...deed,
      location: coords
    };
    await updateDeed(updated);
    return updated;
  }
}

class CompleteDeed extends Component {

  constructor (props) {
    super(props);
    this.completeDeed = this.completeDeed.bind(this);
    this.toggleRecordLocation = this.toggleRecordLocation.bind(this);
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

  async completeDeed () {
    const {deed, imageData, navigateFns, user} = this.props;
    try {
      const {recordLocation} = this.state;
      const uploadPromise = imageData ? uploadImage(deed, imageData) : Promise.resolve(null);
      const locationPromise = recordLocation();
      await Promise.all(locationPromise, uploadPromise);
      await getUserDeeds(user, REFRESH);
      navigateFns.myProfile();
    } catch (err) {
      navigateFns.error(err);
    }
  }

  render () {
    return (
      <div>
        <Button click={this.completeDeed} text={this.props.text} />
        <div>
          <input type='checkbox' id='location' onChange={this.toggleRecordLocation} checked={this.state.recordLocation} />
          <label htmlFor="location">Record your current location?</label>
        </div>
      </div>
    );
  }
}

CompleteDeed.propTypes = {
  deed: PropTypes.object.isRequired,
  imageData: PropTypes.object,
  navigateFn: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
}

export default CompleteDeed;