const { config } = require('./util/config');
const bodyParser = require('body-parser');
const express = require('express');
const { info } = require('./util/logging');
const { addLambdaEndpoints } = require('./add-lambda-endpoints');

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/health', (req, res, next) => {
  info('Health Check');
  res.send('ok');
});

addLambdaEndpoints(app);

app.listen(config.port, '0.0.0.0', () => {
  info(`Deed It Cloud Mock running at ${config.port}!`);
});

/* SCOPE
S3 stub
Cloudfront stub with TLS
Lambda
  wonderwall get latest first
  wonderwall get individuals
  wonderwall get unapproved
  approval lambda(s) - deed completion, S3 move, assign points, assign badges
  add user (username, country of origin)
  update user (append extra info..?)
  get Deeds heirarchy
  create instance of deed
  update deed status
  get user profile -
  kill user / update status

*/