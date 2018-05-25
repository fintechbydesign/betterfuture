import React from 'react';
import PropTypes from 'prop-types';
import loremIpsum from 'lorem-ipsum';
import './Text.css';

function Text(props) {
  const className = props.className ? `Text-text ${props.className}` : 'Text-text';
  const text = (!props.text)
    ? 'Missing text'
    : (typeof props.text === 'string')
    ? props.text
    : loremIpsum(props.text);
  return <div className={className}>{text}</div>
};

Text.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
};

export default Text;
