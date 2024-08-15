const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory message storage
let messages = [];

// Routes
const indexRoute = require('./routes/index');
const newRoute = require('./routes/new');
const messageRoute = require('./routes/message');

app.use('/', indexRoute(messages));
app.use('/new', newRoute(messages));
app.use('/message', messageRoute(messages)); // New route for individual messages

app.listen(port, () => {
  console.log(`Message board app listening at http://localhost:${port}`);
});
