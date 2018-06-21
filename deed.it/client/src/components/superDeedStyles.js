import greenIcon from '../images/deed-green.svg';
import happyIcon from '../images/deed-community-spirit.svg';
import homelessIcon from '../images/social-bite-deed.svg';
import './superDeedStyles.css';

export default [
  {
    'background-color': '#FF6112',
    color: '#FF6112',
    className: 'SuperDeed-homeless',
    id: 'Support SocialBite',
    icon: homelessIcon,
    index: 0
  },
  {
    'background-color': '#20BCA4',
    color: '#20BCA4',
    className: 'SuperDeed-green',
    id: 'Make Edinburgh Green',
    icon: greenIcon,
    index: 1
  },
  {
    'background-color': '#0E88FC',
    color: '#0E88FC',
    className: 'SuperDeed-happy',
    id: 'Community Spirit',
    icon: happyIcon,
    index: 2
  }
  ];
