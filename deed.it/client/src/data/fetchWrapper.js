import delay from "./delay";
import rootURLs from "../config/rootURLs";

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

const DELAY = 0; // 2000;

const cache = {};

const throwError = (endPoint, response) => {
  throw new Error(`fetch error to endpoint '${endPoint}': HTTP code  ${response.status} : ${response.statusText}`);
}

const getData = async(endpoint, force=false) => {
  if ( endpoint in cache && !force) {
    return cache[endpoint];
  }
  const endPoint = `${rootURLs.data}/${endpoint}`
  await delay(DELAY);
  const response = await fetch(endPoint, getOptions);
  if (response.ok) {
    const json = response.json();
    cache[endpoint] = json;
    return json;
  } else {
    throwError(endPoint, response);
  }
}

const postData = async(endpoint, body) => {
  const endPoint = `${rootURLs.data}/${endpoint}`
  await delay(DELAY);
  const options = { ...postOptions, body: JSON.stringify(body) };
  const response = await fetch(endPoint, options);
  if (!response.ok) {
    throwError(endPoint, response);
  }
}

export {
  getData,
  postData
};