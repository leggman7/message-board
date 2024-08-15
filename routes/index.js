const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    db.all('SELECT * FROM messages', [], (err, rows) => {
      if (err) {
        return res.status(500).send('Database error: ' + err.message);
      }
      res.render('index', { messages: rows });
    });
  });

  return router;
};
