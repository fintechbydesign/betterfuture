import React from 'react';
import PropTypes from 'prop-types';
import loremIpsum from 'lorem-ipsum';
import './Text.css';

function Text(props) {
  const text = (typeof props.text === 'string') ? props.text : loremIpsum(props.text);
  return <div className='Text-text'>{text}</div>
};

Text.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
};

export default Text;
