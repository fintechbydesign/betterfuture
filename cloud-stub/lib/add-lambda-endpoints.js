const { info } = require('./util/logging');
const {
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
} = require('./data/data');

function addLambdaEndpoints(app) {
  app.get('/data', (req, res, next) => {
    info('Database');
    res.json(getData());
  });

  app.get('/wonderwall/latest/:timestamp', (req, res, next) => {
    const timestamp = req.params.timestamp;
    info('Latest from Wonderwall since ' + timestamp);
    res.json({ results: getWonderwallLatest(timestamp) });
  });

  app.get('/wonderwall/user/:username', (req, res, next) => {
    const username = req.params.username;
    info('Wonderwall for user ' + username);
    res.json({ results: getUserWonderwall(username) });
  });

  app.get('/wonderwall/status/:deedStatus', (req, res, next) => {
    const deedStatus = req.params.deedStatus;
    info(deedStatus + ' deeds for Wonderwall');
    res.json({ results: getWonderwallByStatus(deedStatus) });
  });

  app.post('/set-deed-status/:deedId/:deedStatus', (req, res, next) => {
    const deedId = req.params.deedId;
    const deedStatus = req.params.deedStatus;
    info('set status ' + deedStatus + ' for deed ID ' + deedId);
    setDeedStatus(deedId, deedStatus);
    res.send('set status ' + deedStatus + ' for deed ID ' + deedId);
  });

  app.post('/approve-deed/:deedId', (req, res, next) => {
    const deedId = req.params.deedId;
    info('approve deed ID ' + deedId);
    setDeedStatus(deedId, 'approved');
    res.send('approved deed ID ' + deedId);
  });

  app.post('/create-user', (req, res, next) => {
    info('create user');
    createUser(req.body.username, req.body.country);
    res.send(`user created ${req.body.username}`);
  });

  app.post('/add-user-info/:username', (req, res, next) => {
    info('add info to user');
    addInfoToUser(req.params.username, req.body);
    res.send(`info appended to user ${req.params.username}`);
  });

  app.get('/user-profile/:username', (req, res, next) => {
    info('get user profile');
    res.json(getUserProfile(req.params.username));
  });

  app.post('/remove-user/:username', (req, res, next) => {
    info('remove user');
    removeUser(req.params.username);
    res.send(`user removed ${req.params.username}`);
  });

  app.post('/create-user-deed', (req, res, next) => {
    info('create deed for user');
    const deed = createUserDeed(req.body.username, req.body.deedTypeId);
    res.send(`deed created ${JSON.stringify(deed)}`);
  });

  app.get('/deed-hierarchy', (req, res, next) => {
    info('get deed hierarchy');
    res.json(getDeedHierarchy());
  });
}

module.exports = {
  addLambdaEndpoints
};

