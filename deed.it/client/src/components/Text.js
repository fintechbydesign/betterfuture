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
  const { className, containerType, contents, dummyText, htmlFor, style, text } = props;
  const ContainerType = (containerType) ? containerType : 'div';
  const divClassName = className ? `Text-text ${className}` : 'Text-text';
  const divContents = (contents)
    ? getContents(contents)
    : (dummyText)
    ? getDummyText(dummyText)
    : (text)
    ? getText(text)
    : 'Missing Text';
  return <ContainerType className={divClassName} htmlFor={htmlFor} style={style}>{divContents}</ContainerType>;
}

export default Text;
