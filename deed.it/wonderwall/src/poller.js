const BASE_URL = '';
const URL = `${BASE_URL}/wonderwall/latest`
const ONE_HOUR = 60 * 60 * 1000;
const POLL_INTERVAL = 5 * ONE_HOUR;  // just for dev!
const MINIMUM_TILES_TO_START = 20;

const fetchOptions = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'GET'
};

let latestTileTimestamp;
let callbackEvents;

const setLatestTileTimestamp = (millis) => {
  latestTileTimestamp = millis;
}

const reportError = (errMsg) => {
  console.log(errMsg);
  if (callbackEvents) {
    callbackEvents.news({ src: errMsg });
  }
}

const getLatestTiles = async(timestamp) => {
  console.log(`Polling for tiles since ${new Date(timestamp).toLocaleString()}`);
  const endpoint = `${URL}/${timestamp}`;
  try {
    const response = await fetch(endpoint, fetchOptions);
    if (response.ok) {
      const json = await response.json();
      return json.results;
    } else {
      reportError(`fetch error: HTTP code  ${response.status} : ${response.statusText}`);
    }
  } catch (err) {
    reportError(err.message);
  }
  return [];
}

const processTile = (tile) => {
  const { timestamp, type } = tile;
  if (type in callbackEvents) {
    callbackEvents[type](tile);
  } else {
    reportError(`Unknown tile type '${type}`);
  }
  setLatestTileTimestamp(timestamp);
}

const processTiles = (tiles) => {
  tiles.forEach(processTile);
  setTimeout(poll, POLL_INTERVAL);
}

const poll = async() => {
  const tiles = await getLatestTiles(latestTileTimestamp);
  processTiles(tiles);
}

const start = async(events) => {
  callbackEvents = events;
  const oneDayAgo = Date.now() - 24 * ONE_HOUR;
  let tiles = [];
  let timestamp = Date.now();
  while (tiles.length < MINIMUM_TILES_TO_START && timestamp > oneDayAgo) {
    timestamp = timestamp - ONE_HOUR;
    tiles = await getLatestTiles(timestamp); 
  }
  if (tiles.length < MINIMUM_TILES_TO_START ) {
    reportError('Error: Insufficient tiles to display');
  } else {
    processTiles(tiles);
  }
}

export default start;