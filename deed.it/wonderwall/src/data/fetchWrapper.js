const baseUrl = 'https://api.deedit.org/v1/';

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

const createError = (endPoint, response) =>
  new Error(`fetch error to endpoint '${endPoint}': HTTP code  ${response.status} : ${response.statusText}`);

const getData = async(endpoint) => {
  const endPoint = `${baseUrl}/${endpoint}`;
  const response = await fetch(endPoint, getOptions);
  if (response.ok) {
    return await response.json();
  } else {
    throw createError(endPoint, response);
  }
};

const postData = async(endpoint, body) => {
  const endPoint = `${baseUrl}/${endpoint}`;
  const options = { ...postOptions };
  if (body) {
    options.body = JSON.stringify(body);
  }
  const response = await fetch(endPoint, options);
  if (!response.ok) {
    throw createError(endPoint, response);
  }
};

export {
  getData,
  postData
};
