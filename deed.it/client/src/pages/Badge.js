import React from 'react';
import BadgeIcon from '../components/BadgeIcon';
import Text from '../components/Text';
import './Badge.css';

function Badge (props) {
  const { myProfile, src } = props;
  const badgeProps = {
    className: 'Badge-image',
    index: 1,
    onClick: myProfile,
    src
  };
  const textProps = {
    className: 'Badge-text',
    contents: [
      'Back to ',
      (<a key='link' onClick={myProfile}>My Profile</a>)
    ]
  }
  return (
    <div>
      <BadgeIcon {...badgeProps} />
      <Text {...textProps} />
    </div>
  );
}

export default Badge;
