import AboutUs from './AboutUs';
import CompleteDeed from './CompleteDeed';
import DeeditDifference from './DeeditDifference';
import Error from './Error';
import Evidence from './Evidence';
import Home from './Home';
import MyProfile from './MyProfile';
import PickADeed from './PickADeed';
import Pledge from './Pledge';
import Register from './Register';
import TakePhoto from './TakePhoto';
import TermsAndConditions from './TermsAndConditions';
import UploadPhoto from './UploadPhoto';

const alwaysOK = () => true;

const containsUsername = (user) => !!user.username;

export default {
  'aboutUs': {
    component: AboutUs,
    isStateValid: alwaysOK
  },
  'completeDeed': {
    component: CompleteDeed,
    isStateValid: alwaysOK
  },
  'deeditDifference': {
    component: DeeditDifference,
    isStateValid: alwaysOK
  },
  'evidence': {
    component: Evidence,
    isStateValid: alwaysOK
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
    isStateValid: alwaysOK
  },
  'register': {
    component: Register,
    isStateValid: alwaysOK
  },
  'takePhoto': {
    component: TakePhoto,
    isStateValid: alwaysOK
  },
  'termsAndConditions': {
    component: TermsAndConditions,
    isStateValid: alwaysOK
  },
  'uploadPhoto': {
    component: UploadPhoto,
    isStateValid: alwaysOK
  }
};
