const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const bodyParser = require('body-parser');

const port = 1971;
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
})

http.listen(port, () => console.log(`Server listening on port ${port}`));
