const express = require('express');
const path = require('path');
const http = require('http');
const io = require('socket.io');
const bodyParser = require('body-parser');

const config = {
  port: 80,
  securePort: Number(process.env.PORT) || 443
};

const clientRoot = path.resolve(__dirname, '../client/build');
const wonderwallRoot = path.resolve(__dirname, '../wonderwall/build');
const whispersRoot = path.resolve(__dirname, '../whispers/build');

const app = express();
const httpServer = http.createServer(app);
const socketsOptions = {
  serveClient: false
}
const socketsServer = io(httpServer, socketsOptions);

app.use(bodyParser.json({limit: '2mb'}));
app.use("/", express.static(clientRoot));
app.use("/wonderwall", express.static(wonderwallRoot));
app.use("/whispers", express.static(whispersRoot));

app.post('/photo', (request, response) => {
  console.log(`Photo received from user ${request.body.username}`);
  socketsServer.emit('photo', request.body);
  response.status(200).end();
});

app.post('/user', (request, response) => {
  console.log(`User received from user ${request.body.username}`);
  socketsServer.emit('user', request.body);
  response.status(200).end();
});

app.post('/whisper', (request, response) => {
  console.log(`whisper received: `);
  response.status(200).end();
});

socketsServer.on('connection', (socket) => {
  console.log('wonderwall connected');
  socketsServer.emit('news', 'Another WonderWall connected!');
})

httpServer.listen(config.port, () => console.log(`Server listening on port ${config.port}`));

/* https options
const fs = require('fs');
const certsRoot = path.resolve(__dirname, './.ssl');
const privateKey = fs.readFileSync(path.resolve(certsRoot, 'key.pem'));
const certificate = fs.readFileSync(path.resolve(certsRoot, 'cert.pem'));
const credentials = {
  key: privateKey,
  cert: certificate,
  passphrase: '1234'
};
const https = require('https');
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(config.securePort, () => console.log(`Secure server listening on ${config.securePort}`));
*/
