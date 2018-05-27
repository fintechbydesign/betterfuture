import React, { Component } from 'react';
import Fetching from '../components/Fetching';

class Uploading extends Component {

  constructor (props) {
    super(props);
    this.updateProgress = this.updateProgress.bind(this);
    this.state = {};
  }

  componentDidMount () {
    const { uploadProgress } = this.props;
    if (uploadProgress) {
      uploadProgress.on('httpUploadProgress', this.updateProgress);
    }
  }

  updateProgress (progress) {
    const { loaded, total } = progress;
    const percentage = Math.round( 100 * loaded / total );
    this.setState({ percentage });
  }

  render () {
    const { percentage } = this.state;
    const msg = percentage ? `Uploaded ${percentage}%` : 'Uploading...';
    return (
      <div>
        <Fetching text={msg}/>
      </div>
    );
  }
}

export default Uploading;
