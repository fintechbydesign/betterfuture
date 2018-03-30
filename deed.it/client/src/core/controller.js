import React from 'react';
import ChooseDeed from '../pages/ChooseDeed.js';
import ChooseReward from '../pages/ChooseReward.js';
import CompleteDeed from '../pages/CompleteDeed.js';
import DisplayDeed from '../pages/DisplayDeed.js';
import Error from '../pages/Error.js';
import Register from '../pages/Register.js';
import ShowWallet from '../pages/ShowWallet.js';
import Welcome from '../pages/Welcome.js';
import WelcomeBack from '../pages/WelcomeBack.js';
import { getUser, removeUser } from '../stores/user.js';

const getInitialState = () => {
  let stage;
  try {
    getUser();
    stage = 'welcomeBack';
  } catch (err) {
    stage = 'welcome';
  }
  return { stage };
};

const selectPage = (state, setState) => {

  const setStage = (stage) => setState({...state, stage});
  const register = setStage.bind(null, 'register');
  const chooseDeed = setStage.bind(null, 'chooseDeed');
  const displayDeed = setStage.bind(null, 'displayDeed');
  const welcomeBack = setStage.bind(null, 'welcomeBack');
  const completeDeed = setStage.bind(null, 'completeDeed');
  const chooseReward = setStage.bind(null, 'chooseReward');
  const showWallet = setStage.bind(null, 'showWallet');
  const reset = () => {
    removeUser();
    setStage('welcome');
  };

  try {
    switch (state.stage) {
      case 'welcome':
        return (<Welcome register={register} />);
      case 'welcomeBack':
        return (<WelcomeBack chooseDeed={chooseDeed} displayDeed={displayDeed} completeDeed={completeDeed} reset={reset} showWallet={showWallet} />);
      case 'register': 
        return (<Register chooseDeed={chooseDeed} />);
      case 'chooseDeed':
        return (<ChooseDeed displayDeed={displayDeed} />);
      case 'displayDeed':
        return (<DisplayDeed accept={welcomeBack} reject={chooseDeed} />);
      case 'completeDeed':
        return (<CompleteDeed submit={chooseReward} cancel={welcomeBack} />);
      case 'chooseReward':
        return (<ChooseReward choose={welcomeBack} />);
      case 'showWallet':
        return (<ShowWallet back={welcomeBack} />);
      default:
        throw new Error(`Unknown stage '${state.stage}'`);
    }
  }
  catch (err) {
    return (<Error err={err} reset={reset} />)
  }
};

export {
  getInitialState,
  selectPage
}
