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
    id: uuidv4()
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

const createUser = async(user) => {
  const { username, personal } = user;
  const { age, country } = personal;
  await postData('create-user', { age, country, username });
};

const removeUser = () => remove(USER);

export {
  createLocalUser,
  getLocalUser,
  updateLocalUser,
  createUser,
  removeUser
};
