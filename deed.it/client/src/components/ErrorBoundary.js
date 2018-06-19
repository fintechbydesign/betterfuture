import React from 'react';
import { postData } from '../data/fetchWrapper';
import Error from '../pages/Error';

const postError = async(error, info, userAgent) => {
  const body = { error, info, userAgent };
  return postData('deeditLogError', body);
};

async function logError(error, info) {
  try {
    await postError(error.message, info, navigator.userAgent);
  } catch (err) {
    error({err});
  }
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  async componentDidCatch(error, info) {
    this.setState({ hasError: true, errorMessage: error.message });
    await logError(error, info);
  }

  render() {
    if (this.state.hasError === true) {
      return <Error err={this.state.errorMessage} />
    }
    return this.props.children;
  }
}

export default ErrorBoundary;