import React from 'react';
import Image from './Image';
import badgeImages from '../../../common/src/images/badgeImages';

function BadgeIcon (props) {
  const { className, index, onClick, src } = props;
  const imageProps = {
    alt: 'badge',
    className,
    onClick,
    src: badgeImages[src],
    type: 'appImage'
  }
  return (
    <div key={index}>
      <Image { ...imageProps } />
    </div>
  );
}

export default BadgeIcon;
