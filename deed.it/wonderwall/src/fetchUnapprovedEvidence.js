const BASE_URL = '';
const URL = `${BASE_URL}/deeditWonderwallLatest?deedStatus=unapproved`

const fetchOptions = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'GET'
};

const reportError = (errMsg, events) => {
  console.log(errMsg);
  events.news({ src: errMsg });
}

const processTile = (tile, events) => {
  const { type } = tile;
  if ( type === 'photo') {
    events.photo(tile);
  }
}

const fetchUnapprovedEvidence = async(events) => {
  try {
    const response = await fetch(URL, fetchOptions);
    if (response.ok) {
      const json = await response.json();
      const { results } = json;
      results.forEach(processTile);
    } else {
      reportError(`fetch error: HTTP code  ${response.status} : ${response.statusText}`, events);
    }
  } catch (err) {
    reportError(err.message);
  }
  return [];
}

export default fetchUnapprovedEvidence;