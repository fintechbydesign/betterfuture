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

const cache = {};

const getData = async(endpoint, force=false) => {
  if ( endpoint in cache && !force) {
    return cache[endpoint];
  }
  const endPoint = `${rootURLs.data}/${endpoint}`
  await delay(2000);
  const response = await fetch(endPoint, getOptions);
  const json = response.json();
  cache[endpoint] = json;
  return json;
}

const postData = async(endpoint, body) => {
  const endPoint = `${rootURLs.data}/${endpoint}`
  await delay(2000);
  return fetch(endPoint, { ...postOptions, body });
}

export {
  getData,
  postData
};