import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const getLocation = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (err) => {
        console.log(`Position error: ${err.code} : ${err.message}`);
        resolve(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
  }
);

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
    const {deed, imageData, navigateFn, user} = this.props;
    const { recordLocation }= this.state;
    const location = recordLocation ? await getLocation() : null;
    alert( location);
    navigateFn();
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
  navigateFn: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
}

export default CompleteDeed;