/* eslint no-mixed-operators:0 */
const USER = 'user';

// thanks to https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#2117523
const uuidv4 = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(
  /[018]/g,
  c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
);

const get = (key) => (localStorage[key]) ? JSON.parse(localStorage[key]) : undefined;

const set = (key, obj) => localStorage[key] = JSON.stringify(obj);

const remove = (key) => delete localStorage[key];

const getUser = () => {
  const user = get(USER);
  if (!user) {
    throw new Error('User not created');
  }
  return user;
}

const createUser = () => {
  if (get(USER)) {
    throw new Error('User already created');
  }
  const user = {
    id: uuidv4(),
    wallet: 0
  };
  set(USER, user);
  return user;
};

const setUserProps = (newProps) => {
  const user = getUser();
  if (!user) {
    throw new Error('User not defined');
  }
  set(USER, {...user, ...newProps });
}

const removeUser = () => remove(USER);

export {
  createUser,
  getUser,
  setUserProps,
  removeUser
}


