/* eslint no-mixed-operators:0 */

// thanks to https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#2117523
const uuidv4 = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(
  /[018]/g, 
  c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
);

const getUserId = () => localStorage.userId;

const createUserId = () => {
  const id = uuidv4();
  localStorage.userId = id;
  return id;
};

const getUserDeedId = () => {
  return localStorage.deedId;
}

const setUserDeedId = (deedId) => {
  localStorage.deedId = deedId;
}

const removeUser = () => {
  delete localStorage.deedId;
  delete localStorage.userId;
  delete localStorage.wallet;
}

const removeUserDeed = () => {
  delete localStorage.deedId;
}

const incrementUserWallet = (incr) => {
  let wallet = getUserWallet();
  if (wallet) {
    wallet = Number(wallet) + incr;
  } else {
    wallet = incr;
  }
  localStorage.wallet = wallet;
}

const decrementUserWallet = (decr) => {
  let wallet = getUserWallet();
  if (wallet) {
    wallet = Number(wallet) - decr;
  } else {
    wallet = 0;
  }
  localStorage.wallet = wallet;
}

const getUserWallet = () => { 
  const wallet = localStorage.wallet;

  return wallet ? (wallet === 'undefined') ? 0 : wallet : 0;
}

export {
  createUserId,
  getUserId,
  getUserDeedId,
  setUserDeedId,
  removeUser,
  removeUserDeed,
  getUserWallet,
  incrementUserWallet,
  decrementUserWallet
}

