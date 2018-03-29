const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const hbs = require('hbs');

const port = 1971;
const photos = [];

app.use(bodyParser.json({limit: '2mb'}));
app.use(express.static('public'));

app.set('view engine', 'hbs');
hbs.registerPartials('./views/partials');

app.post('/photo', (request, response) => {
  console.log(`Photo received from id ${request.body.id}`);
  photos.push(request.body);
  response.status(200).end();
});

app.get('/wonderwall', (request, response) => {
  response.render('wonderwall', {photos});
});

app.listen(port, () => console.log(`Express listening on port ${port}`));
