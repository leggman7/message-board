const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');  // Import the database connection

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRoute = require('./routes/index')(db);
const newRoute = require('./routes/new')(db);
const messageRoute = require('./routes/message')(db);
const usersRoute = require('./routes/users')(db);

app.use('/', indexRoute);
app.use('/new', newRoute);
app.use('/message', messageRoute);
app.use('/users', usersRoute);

app.listen(port, () => {
  console.log(`Message board app listening at http://localhost:${port}`);
});
