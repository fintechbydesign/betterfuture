const uuidv4 = require('uuid/v4');
const users = require('./users');
const deeds = require('./deeds');
const deedHierarchy = require('./deed-hierarchy');
const events = require('./events');

const data = {
  users,
  deeds,
  events,
  deedHierarchy,
  deedIdSeq: 0
};

const WONDERWALL_DEFAULT_TILES = 5;

const timestampNewToOld = (a, b) => b.timestamp - a.timestamp;

const generateTile = ({username, src, timestamp, type}) => ({username, src, timestamp, type});

function getWonderwallTiles() {
  const videos = data.deeds
    .filter(deed => deed.evidenceType === 'video')
    .map(deed => generateTile({ ...deed, type: 'video' }));
  const photos = data.deeds
    .filter(deed => deed.evidenceType === 'photo')
    .map(deed => generateTile({ ...deed, type: 'photo' }));
  const news = data.events
    .filter(deed => deed.newsType === 'news')
    .map(deed => generateTile({ ...deed, type: 'news' }));
  const badges = data.events
    .filter(deed => deed.newsType === 'badge')
    .map(deed => generateTile({ ...deed, type: 'badge' }));
  const results = [ ...videos, ...photos, ...news, ...badges].sort(timestampNewToOld);
  return results;
}

function getData() {
  return data;
}

function getDeedHierarchy() {
  return data.deedHierarchy;
}

function createUser(username, country) {
  data.users.push({username, country});
}

function addInfoToUser(username, info) {
  const userIndex = data.users.findIndex(u => u.username === username);
  if (userIndex > -1) {
    data.users[userIndex] = {...data.users[userIndex], ...info};
  }
}

function getUserProfile(username) {
  const user = data.users.find(u => u.username === username);
  if (user) {
    const deeds = data.deeds.filter(u => u.username === username);
    const events = data.events.filter(u => u.username === username);
    return { user, deeds, events };
  }
  return {};
}


function removeUserDeeds(username) {
  let deedIndex = data.deeds.findIndex(u => u.username === username);
  while (deedIndex > -1) {
    data.deeds.splice(deedIndex, 1);
    deedIndex = data.deeds.findIndex(u => u.username === username);
  }
}

function removeUserEvents(username) {
  let eventsIndex = data.events.findIndex(u => u.username === username);
  while (eventsIndex > -1) {
    data.events.splice(eventsIndex, 1);
    eventsIndex = data.events.findIndex(u => u.username === username);
  }
}

function removeUser(username) {
  const userIndex = data.users.findIndex(u => u.username === username);
  if (userIndex > -1) {
    data.users.splice(userIndex, 1);
    removeUserDeeds(username);
    removeUserEvents(username);
  }
}

function createUserDeed(username, deedTypeId) {
  const deed = {
    id: uuidv4(),
    username,
    deedTypeId,
    status: 'created',
    timestamp: Date.now(),
  };
  data.deeds.push(deed);
  return deed;
}

function getWonderwallLatest(n = WONDERWALL_DEFAULT_TILES) {
  const allTiles = getWonderwallTiles();
  return allTiles.slice(0, n);
}

function getUserWonderwall(username, n = WONDERWALL_DEFAULT_TILES) {
  const allTiles = getWonderwallTiles();
  const results = allTiles.filter(tile => tile.username === username);
  return results.slice(0, n);
}

function getWonderwallByStatus(deedStatus) {
  const allDeeds = data.deeds.map(deed => ({ ...deed, type: deed.evidenceType }));
  const results = allDeeds.filter(tile => tile.status === deedStatus);
  return results;
}

function setDeedStatus(deedId, deedStatus) {
  const deed = data.deeds.find(deed => deed.id === deedId);
  console.log('deed', deed);
  if (deed) {
    deed.status = deedStatus;
  }
}

module.exports = {
  addInfoToUser,
  createUser,
  createUserDeed,
  getData,
  getDeedHierarchy,
  getUserProfile,
  getWonderwallByStatus,
  getWonderwallLatest,
  getUserWonderwall,
  removeUser,
  setDeedStatus
};
