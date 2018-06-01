import delay from './delay';
import rootURLs from '../config/rootURLs';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const getOptions = {
  headers,
  method: 'GET'
};

const postOptions = {
  headers,
  method: 'POST'
};

const DELAY = 0;

const REFRESH = true;

// a cache of Promises per endpoint
const cache = {};

const createError = (endPoint, response) =>
  new Error(`fetch error to endpoint '${endPoint}': HTTP code  ${response.status} : ${response.statusText}`);

const createGetPromise = (endpoint) => {
  return new Promise(async(resolve, reject) => {
    const endPoint = `${rootURLs.data}${endpoint}`;
    try {
      await delay(DELAY);
      console.log('fetch', endPoint);
      const response = await fetch(endPoint, getOptions);
      if (response.ok) {
        console.log('OK');
        const json = await response.json();
        console.log('json', json);
        resolve(json);
      } else {
        delete cache[endpoint];
        reject(createError(endPoint, response));
      }
    } catch (err) {
      delete cache[endpoint];
      reject(err);
    }
  });
};

const getData = (endpoint, force = false) => {
  console.log('getData', endpoint);
  if (endpoint in cache && !force) {
    console.log('cached');
    return cache[endpoint];
  }
  const cachePromise = createGetPromise(endpoint);
  cache[endpoint] = cachePromise;
  return cachePromise;
};

const postData = async(endpoint, body) => {
  const endPoint = `${rootURLs.data}${endpoint}`;
  await delay(DELAY);
  const options = { ...postOptions };
  if (body) {
    options.body = JSON.stringify(body);
  }
  console.log('PostData body"', JSON.stringify(options,null,2));
  const response = await fetch(endPoint, options);
  if (!response.ok) {
    throw createError(endPoint, response);
  }
};

export {
  getData,
  postData,
  REFRESH
};
