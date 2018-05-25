import AboutUs from './AboutUs';
import Error from './Error';
import Evidence from './Evidence';
import Home from './Home';
import MyProfile from './MyProfile';
import PickADeed from './PickADeed';
import Register from './Register';
import StartDeed from './StartDeed';
import TermsAndConditions from './TermsAndConditions';

const alwaysOK = () => true;

const containsSelectedDeed = (user) =>
  user.deeds.selected && user.deeds.selected.deedType && user.deeds.selected.superDeed;

const containsCurrentDeed = (user) => user.deeds.current;

export default {
  'aboutUs': {
    component: AboutUs,
    isStateValid: alwaysOK
  },
  'evidence': {
    component: Evidence,
    isStateValid: containsCurrentDeed
  },
  'error': {
    component: Error,
    isStateValid: alwaysOK
  },
  'home': {
    component: Home,
    isStateValid: alwaysOK
  },
  'myProfile': {
    component: MyProfile,
    isStateValid: alwaysOK
  },
  'pickADeed': {
    component: PickADeed,
    isStateValid: alwaysOK
  },
  'register': {
    component: Register,
    isStateValid: containsSelectedDeed
  },
  'startDeed': {
    component: StartDeed,
    isStateValid: containsSelectedDeed
  },
  'termsAndConditions': {
    component: TermsAndConditions,
    isStateValid: alwaysOK
  }
};
