const data = {
  deeds: [
    {
      deedId: '1',
      timestamp: 10000000001,
      username: 'CrazyWoman',
      evidenceType: 'photo',
      src: 'http://i0.kym-cdn.com/photos/images/original/001/316/888/f81.jpeg',
      status: 'approved'
    },
    {
      deedId: '2',
      timestamp: 10000000002,
      username: 'Pablo',
      evidenceType: 'photo',
      src: 'http://i0.kym-cdn.com/photos/images/original/001/108/692/bb7.jpg',
      status: 'approved'
    },
    {
      deedId: '3',
      timestamp: 10000000003,
      username: 'John',
      evidenceType: 'photo',
      src: 'http://i0.kym-cdn.com/photos/images/original/001/171/854/c6d.png',
      status: 'approved'
    },
    {
      deedId: '4',
      timestamp: 10000000005,
      username: 'Ryan',
      evidenceType: 'photo',
      src: 'https://t3.ftcdn.net/jpg/01/59/05/92/240_F_159059230_qQmWBKtapcXlJIbCSO5SOAOQcJumOMD5.jpg',
      status: 'approved'
    },
    {
      deedId: '5',
      timestamp: 10000000006,
      username: 'Pablo',
      evidenceType: 'photo',
      src: 'http://budgetstockphoto.com/bamers/stock_photo_spectrum.jpg',
      status: 'approved'
    },
    {
      deedId: '6',
      timestamp: 10000000007,
      username: 'Ryan',
      evidenceType: 'video',
      src: 'https://vod-eurosport.akamaized.net/olympics/2018/02/19/Y2JasJikUVW_concat_19061318-1064721-700-512-288.mp4',
      status: 'approved'
    },
    {
      deedId: '7',
      timestamp: 10000000008,
      username: 'CrazyWoman',
      evidenceType: 'photo',
      src: 'https://atendesigngroup.com/sites/default/files/styles/very_large/public/array-map-filter-reduce-produce.png?itok=Cj3xTxMY',
      status: 'unapproved'
    },
    {
      deedId: '8',
      timestamp: 10000000010,
      username: 'Kristina',
      evidenceType: 'photo',
      src: 'https://c.stocksy.com/a/W9C000/z0/46718.jpg',
      status: 'approved'
    },
    {
      deedId: '9',
      timestamp: 10000000011,
      username: 'Pablo',
      evidenceType: 'photo',
      src: 'https://cdn-images-1.medium.com/max/1280/1*W7y0sqiFXo8RBGxGpp7etA.png',
      status: 'unapproved'
    }
  ],
  events: [
    {
      timestamp: 10000000004,
      username: 'Mike',
      newsType: 'news',
      src: 'Mike has just joined us!'
    },
    {
      timestamp: 10000000009,
      username: 'Mike',
      newsType: 'badge',
      src: 'Mike just got the Silver medal'
    }
  ]
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
  const deed = data.deeds.find(deed => deed.deedId === deedId);
  console.log('deed', deed);
  if (deed) {
    deed.status = deedStatus;
  }
}

module.exports = {
  getWonderwallByStatus,
  getWonderwallLatest,
  getUserWonderwall,
  setDeedStatus
};
