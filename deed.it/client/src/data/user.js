import uuidv4 from 'uuid/v4';
import defaultUser from './defaultUser';

const USER = 'user';

const get = (key) => (localStorage[key]) ? JSON.parse(localStorage[key]) : undefined;

const set = (key, obj) => localStorage[key] = JSON.stringify(obj);

const remove = (key) => delete localStorage[key];

const getLocalUser = () => {
  const user = get(USER);
  if (!user) {
    throw new Error('User not created');
  }
  // backwards compatability
  return { ...defaultUser, ...user };
}

const createLocalUser = () => {
  if (get(USER)) {
    throw new Error('User already created');
  }
  const user = {
    ...defaultUser,
    id: uuidv4(),
  };
  set(USER, user);
  return user;
};

const createUser = async(user) => {
  console.log('TODO: createUser');
  return updateUser(user);
}

const updateUser = async(user) => {
  set(USER, user);
  return user;
}

const removeUser = () => remove(USER);

export {
  createLocalUser,
  createUser,
  getLocalUser,
  removeUser,
  updateUser
}


