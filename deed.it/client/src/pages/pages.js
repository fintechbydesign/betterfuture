import AboutUs from './AboutUs';
import DeeditDifference from './DeeditDifference';
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

const containsSelectedDeedType = (user) =>
  user.selected && user.selected.deedType && user.selected.superDeed;

const containsSelectedDeed = (user) =>
  user.selected && user.selected.deed;

const containsUsername = (user) => !!user.username;

export default {
  'aboutUs': {
    component: AboutUs,
    isStateValid: alwaysOK
  },
  'deeditDifference': {
    component: DeeditDifference,
    isStateValid: alwaysOK
  },
  'evidence': {
    component: Evidence,
    isStateValid: containsSelectedDeed
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
    isStateValid: containsSelectedDeed
  },
  'register': {
    component: Register,
    isStateValid: containsSelectedDeedType
  },
  'startDeed': {
    component: StartDeed,
    isStateValid: containsSelectedDeedType
  },
  'takePhoto': {
    component: TakePhoto,
    isStateValid: containsSelectedDeed
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
    isStateValid: containsSelectedDeed
  }
};
