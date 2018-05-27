import AboutUs from './AboutUs';
import Error from './Error';
import Evidence from './Evidence';
import Home from './Home';
import MyProfile from './MyProfile';
import PickADeed from './PickADeed';
import Pledge from './Pledge';
import Register from './Register';
import StartDeed from './StartDeed';
import TakePhoto from './TakePhoto';
import TermsAndConditions from './TermsAndConditions';
import Uploading from './Uploading';
import UploadPhoto from './UploadPhoto';

const alwaysOK = () => true;

const containsSelectedDeed = (user) =>
  user.deeds.selected && user.deeds.selected.deedType && user.deeds.selected.superDeed;

const containsCurrentDeed = (user) => !!user.deeds.current;

const containsUsername = (user) => !!user.username;

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
    isStateValid: containsUsername
  },
  'pickADeed': {
    component: PickADeed,
    isStateValid: alwaysOK
  },
  'pledge': {
    component: Pledge,
    isStateValid: containsCurrentDeed
  },
  'register': {
    component: Register,
    isStateValid: containsSelectedDeed
  },
  'startDeed': {
    component: StartDeed,
    isStateValid: containsSelectedDeed
  },
  'takePhoto': {
    component: TakePhoto,
    isStateValid: containsCurrentDeed
  },
  'termsAndConditions': {
    component: TermsAndConditions,
    isStateValid: alwaysOK
  },
  'uploading': {
    component: Uploading,
    isStateValid: alwaysOK,
  },
  'uploadPhoto': {
    component: UploadPhoto,
    isStateValid: containsCurrentDeed
  }
};
