import React from 'react';
import './Text.css';

const getContent = (content, index) => {
  return (typeof content === 'string')
    ? (<span key={index}>{content}</span>)
    : content;
};
const getContents = (contents) => contents.map(getContent);

function Text (props) {
  const { className, containerType, contents, htmlFor, onClick, style, text } = props;
  const ContainerType = (containerType) || 'div';
  const divClassName = className ? `Text-text ${className}` : 'Text-text';
  const divContents = (contents)
    ? getContents(contents)
    : (text) || 'Missing Text';
  const divProps = {
    className: divClassName,
    htmlFor,
    onClick,
    style
  };
  return <ContainerType {...divProps}>{divContents}</ContainerType>;
}

export default Text;
