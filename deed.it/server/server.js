const express = require('express');
const path = require('path');

const root = path.resolve(__dirname, '../client/build');
const app = express();

app.use(express.static(root));
app.listen(80, () => console.log('Server started on port 80'));
