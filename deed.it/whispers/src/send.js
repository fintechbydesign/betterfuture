const send = (iterations, phrase) => {
  const data = { iterations, phrase };
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  };
  const url = '/whispers';
  return fetch(url, options)
    .then(() => console.log(`Sent successfully to ${url}`))
    .catch((error) => console.error(`Failed to send to ${url}: ${error}`));
}

export default send;
