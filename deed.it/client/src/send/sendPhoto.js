import { getUser } from '../stores/user.js';

const sendPhoto = (imageData) => {
  const url = '/photo';
  const data = {
    id: getUser().id,
    src: imageData
  }
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  };
  fetch(url, options)
    .then(() => console.log('Photo sent successfully,'))
    .catch((error) => console.error(`Photo failed to send: ${error}`));
}

export default sendPhoto;