const send = (url, data) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  };
  return fetch(url, options)
    .then(() => console.log(`Sent successfully to ${url}`))
    .catch((error) => console.error(`Failed to send to ${url}: ${error}`));
};

const sendPhoto = (user, imageData) => {
  const data = {
    src: imageData,
    username: user.username
  };
  return send('/photo', data);
};

const sendUser = (user) => {
  return send('/user', user);
};

export {
  sendPhoto,
  sendUser
};
