const address = require('address');
const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

const privateKey = fs.readFileSync('.ssl/key.pem');
const certificate = fs.readFileSync('.ssl/cert.pem');
const credentials = {
  key: privateKey,
  cert: certificate,
  passphrase: '1234'
};

const app = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
const io = require('socket.io')(httpServer);

const bodyParser = require('body-parser');

const meta = {
  ip: address.ip(),
  port: 1971
}
const photos = [];

const broadcastPhoto = (photo) => {
  io.emit('photo', photo);
}

app.use(bodyParser.json({limit: '2mb'}));
app.use(express.static('public'));

app.post('/photo', (request, response) => {
  console.log(`Photo received from id ${request.body.id}`);
  photos.push(request.body);
  broadcastPhoto(request.body);
  response.status(200).end();
});

io.on('connection', (socket) => {
  console.log('socket client connected');
  socket.emit('meta', meta);
})

const securePort = Number(`${meta.port}1`);
httpServer.listen(meta.port, () => console.log(`Server listening on port ${meta.port}`));
httpsServer.listen(securePort, () => console.log(`Secure server listening on ${securePort}`));
