const express = require('express')
const app = express()

app.use(express.static('public'));

app.post('/photo', (request, response) => {
  console.log('Post received');
  response.status(200).end();
});



app.listen(1971, () => console.log('Express listening on port 1971'));
