import { getData } from './fetchWrapper';

const URL = 'deeditWonderwallLatest';
const ONE_SECOND = 1000;
const ONE_HOUR = 60 * 60 * 1000;
const POLL_INTERVAL = 15 * ONE_SECOND;
const PREFERRED_INITIAL_NUMBER_OF_TILES = 100;

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
  const endpoint = `${URL}?oldestTimestamp=${timestamp}`;
  try {
    const tiles = await getData(endpoint);
    return tiles.filter((tile) => tile.type === 'photo');
  } catch (err) {
    reportError(err.message);
    return [];
  }
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
  console.log(`Poll for tiles after ${latestTileTimestamp} - number of tiles = ${tiles.length}`);
  processTiles(tiles);
}

const start = async(events) => {
  callbackEvents = events;
  const sixHours = 6 * ONE_HOUR;
  const fiveDaysAgo = Date.now() - 10 * 24 * ONE_HOUR;
  let tiles = [];
  let timestamp = Date.now();
  while (tiles.length < PREFERRED_INITIAL_NUMBER_OF_TILES && timestamp > fiveDaysAgo) {
    const date = new Date(timestamp);
    console.log(`timestamp: ${date.toString()}; num of tiles: ${tiles.length}`);
    timestamp = timestamp - sixHours;
    tiles = await getLatestTiles(timestamp); 
  }
  processTiles(tiles);
}

export default start;