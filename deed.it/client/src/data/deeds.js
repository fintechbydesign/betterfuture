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
  const response = await fetch(endPoint, getOptions);
  return response.json();
}

export {
  getDeedHierarchy
}