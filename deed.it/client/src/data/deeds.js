import delay from './delay';
import rootURLs from '../config/rootURLs';

export const getOptions = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'GET',
  mode: 'cors'
};

const getDeedHierarchy = async() => {
  const endPoint = `${rootURLs.data}/deed-hierarchy`
  await delay(2000);
  const response = await fetch(endPoint, getOptions);
  return response.json();
}

const createDeed = async(user, deedType) => {
  console.log('TODO: createDeed');
  return {};
}

export {
  createDeed,
  getDeedHierarchy
}