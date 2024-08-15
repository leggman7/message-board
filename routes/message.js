const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  router.get('/:id', (req, res) => {
    db.get('SELECT * FROM messages WHERE id = ?', [req.params.id], (err, row) => {
      if (err) {
        return res.status(500).send('Database error: ' + err.message);
      }
      if (!row) {
        return res.status(404).send('Message not found');
      }
      res.render('message', { message: row });
    });
  });

  return router;
};
