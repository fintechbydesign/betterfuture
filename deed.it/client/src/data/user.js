import uuidv4 from 'uuid/v4';
import defaultUser from './defaultUser';
import { postData } from './fetchWrapper';
import { get, set, remove } from './localData';

const USER = 'user';

const createLocalUser = () => {
  if (get(USER)) {
    throw new Error('User already created');
  }
  const user = {
    ...defaultUser,
    username: uuidv4()
  };
  set(USER, user);
  return user;
};

const getLocalUser = () => {
  const user = get(USER);
  if (!user) {
    throw new Error('User not created');
  }
  // backwards compatability
  return { ...defaultUser, ...user };
};

const updateLocalUser = (user) => {
  set(USER, user);
  return user;
};

const removeLocalUser = () => remove(USER);

const createUser = async(user) => {
  const { nickname, personal, username } = user;
  const { age, country } = personal;
  await postData('deeditCreateUser', { age, country, nickname, username });
};

const removeUser = async(user) => {
  const endpoint = `remove-user/${user.username}`;
  await postData(endpoint);
}

export {
  createLocalUser,
  getLocalUser,
  updateLocalUser,
  removeLocalUser,
  createUser,
  removeUser
};
