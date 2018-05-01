const { info } = require('./util/logging');
const { getWonderwallByStatus, getWonderwallLatest, getUserWonderwall, setDeedStatus } = require('./data/data');

/* PENDING
  add user (username, country of origin)
  update user (append extra info..?)
  get Deeds heirarchy
  create instance of deed
  update deed status
  get user profile -
  kill user / update status

*/

function addLambdaEndpoints(app) {
  app.get('/wonderwall/latest', (req, res, next) => {
    info('Latest from Wonderwall');
    res.json({ results: getWonderwallLatest() });
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

  app.get('/set-deed-status/:deedId/:deedStatus', (req, res, next) => {
    const deedId = req.params.deedId;
    const deedStatus = req.params.deedStatus;
    info('set status ' + deedStatus + ' for deed ID ' + deedId);
    setDeedStatus(deedId, deedStatus);
    res.send('set status ' + deedStatus + ' for deed ID ' + deedId);
  });

  app.get('/approve-deed/:deedId', (req, res, next) => {
    const deedId = req.params.deedId;
    info('approve deed ID ' + deedId);
    setDeedStatus(deedId, 'approved');
    res.send('approved deed ID ' + deedId);
  });
}

module.exports = {
  addLambdaEndpoints
};

