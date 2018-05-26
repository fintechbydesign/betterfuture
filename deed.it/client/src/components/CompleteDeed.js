import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class CompleteDeed extends Component {

  constructor (props) {
    super(props);
    this.completeDeed = this.completeDeed.bind(this);
    this.state = {
      recordLocation: false
    }
  }

  completeDeed () {
    const {deed, imageData, navigateFn, user} = this.props;
    navigateFn();
  }

  render () {
    return (
      <div>
        <Button click={this.completeDeed} text={this.props.text} />
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