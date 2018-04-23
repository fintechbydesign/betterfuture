const send = async (iterations, phrase) => {
  const data = { iterations, phrase };
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  };
  const url = '/whispers';
    const response = await fetch(url, options);
    if (response.ok) {
      const data = response.json();
      console.log(`Response received`);
      return data;
    }
  const msg = `Failed to send to ${url}: ${response.status}, ${response.statusText}`;
    console.error(msg);
    throw new Error(msg);
}

export default send;
