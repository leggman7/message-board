const express = require('express');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

module.exports = (db) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.render('new', { errors: null, data: {} });
  });

  router.post(
    '/',
    [
      body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
      body('content').trim().isLength({ min: 1 }).withMessage('Content is required'),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render('new', {
          errors: errors.array(),
          data: req.body,
        });
      }

      const { title, content } = req.body;
      const id = uuidv4();
      const timestamp = new Date().toISOString();

      db.run(
        'INSERT INTO messages (id, title, content, timestamp) VALUES (?, ?, ?, ?)',
        [id, title, content, timestamp],
        (err) => {
          if (err) {
            return res.status(500).send('Database error: ' + err.message);
          }
          res.redirect('/');
        }
      );
    }
  );

  return router;
};
