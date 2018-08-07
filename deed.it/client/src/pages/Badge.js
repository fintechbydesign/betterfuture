import React from 'react';
import BadgeIcon from '../components/BadgeIcon';
import Text from '../components/Text';
import Title from '../components/Title';
import badges from '../../../common/src/images/badges';
import './Badge.css';

function Congrats(props) {
  const { explanation } = props;
  return (explanation)
    ? (
        <div className='Badge-congrats' >
          <Title text='Congratulations!' />
          <Text text={props.explanation} />
        </div>
      )
    : null;
}

function Badge (props) {
  const { myProfile, home, src, user } = props;
  const { explanation } = badges[src];
  const badgeProps = {
    imageClassName: 'Badge-image',
    index: 1,
    onClick: myProfile,
    src
  };
  const destination = (user.registered)
    ? { page: myProfile, text: 'My Profile' }
    : { page: home, text: 'Home' };
  const textProps = {
    className: 'Badge-text',
    contents: [
      'Back to ',
      (<a key='link' onClick={destination.page}>{destination.text}</a>)
    ]
  };
  return (
    <div>
      <Congrats explanation={explanation} />
      <BadgeIcon {...badgeProps} />
      <Text {...textProps} />
    </div>
  );
}

export default Badge;
