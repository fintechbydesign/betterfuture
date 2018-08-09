import React from 'react';
import BadgeIcon from '../components/BadgeIcon';
import Text from '../components/Text';
import Title from '../components/Title';
import badges from '../../../common/src/images/badges';
import './Badge.css';
import EasterEgg from "../components/EasterEgg";

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
  const { badge, easterEgg, home, myProfile, src, user } = props;
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
  const renderEasterEgg = (easterEgg)
    ? <EasterEgg badge={badge} className='Badge-easter-egg' easterEgg={easterEgg} />
    : null;
  return (
    <div>
      <Congrats explanation={explanation} />
      <BadgeIcon {...badgeProps} />
      <Text {...textProps} />
      {renderEasterEgg}
    </div>
  );
}

export default Badge;
