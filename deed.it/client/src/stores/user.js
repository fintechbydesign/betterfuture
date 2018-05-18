const defaultUser = require('./defaultUser');
const generateId = require('./generateId');

const USER = 'user';

const get = (key) => (localStorage[key]) ? JSON.parse(localStorage[key]) : undefined;

const set = (key, obj) => localStorage[key] = JSON.stringify(obj);

const remove = (key) => delete localStorage[key];

const getUser = () => {
  const user = get(USER);
  if (!user) {
    throw new Error('User not created');
  }
  // backwards compatability
  return { ...defaultUser, ...user };
}

const createUser = () => {
  if (get(USER)) {
    throw new Error('User already created');
  }
  const user = {
    ...defaultUser,
    id: generateId(),
  };
  set(USER, user);
  return user;
};

const updateUser = (user) => {
  set(USER, user);
}

const removeUser = () => remove(USER);

export {
  createUser,
  getUser,
  removeUser,
  updateUser
}


