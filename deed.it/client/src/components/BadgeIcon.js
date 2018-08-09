import React from 'react';
import Image from './Image';
import Text from './Text';
import badges from '../../../common/src/images/badges';
import './BadgeIcon.css';

function BadgeIcon (props) {
  const { containerClassName, imageClassName, index, onClick, src } = props;
  const { icon, style, text } = badges[src];
  const containerProps = {
    className: (containerClassName) ? `BadgeIcon-container ${containerClassName}` : 'BadgeIcon-container',
    key: index,
    onClick
  };
  const imageProps = {
    alt: 'badge',
    className: imageClassName,
    src: icon,
    type: 'appImage'
  };
  const textProps = {
    style: {
      ...style,
      textAlign: 'center'
    },
    text
  };

  return (
    <div {...containerProps} >
      <Image {...imageProps} />
      <Text {...textProps} />
    </div>
  );
}

export default BadgeIcon;
