import React from 'react';
import loremIpsum from 'lorem-ipsum';
import './Text.css';

const getText = (text) => text;

const getDummyText = (dummyText) => loremIpsum(dummyText);

const getContent = (content, index) => {
  return (typeof content === 'string')
    ? (<span key={index}>{content}</span>)
    : content;
}
const getContents = (contents) => contents.map(getContent);

function Text (props) {
  const { className, contents, text, dummyText } = props;
  const divClassName = className ? `Text-text ${className}` : 'Text-text';
  const divContents = (contents)
    ? getContents(contents)
    : (dummyText)
    ? getDummyText(dummyText)
    : (text)
    ? getText(text)
    : 'Missing Text';
  return <div className={divClassName}>{divContents}</div>;
}

export default Text;
