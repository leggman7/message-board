const express = require('express');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

module.exports = (db) => {
  const router = express.Router();

  // Get list of users
  router.get('/', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) {
        return res.status(500).send('Database error: ' + err.message);
      }
      res.render('users', { users: rows });
    });
  });

  // Display the form to create a new user
  router.get('/new', (req, res) => {
    res.render('new-user', { errors: null, data: {} });
  });

  // Handle the form submission to create a new user
  router.post(
    '/new',
    [
      body('username').trim().isLength({ min: 1 }).withMessage('Username is required'),
      body('email').isEmail().withMessage('A valid email is required'),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render('new-user', {
          errors: errors.array(),
          data: req.body,
        });
      }

      const { username, email } = req.body;
      const id = uuidv4();
      const created_at = new Date().toISOString();

      db.run(
        'INSERT INTO users (id, username, email, created_at) VALUES (?, ?, ?, ?)',
        [id, username, email, created_at],
        (err) => {
          if (err) {
            return res.status(500).send('Database error: ' + err.message);
          }
          res.redirect('/users');
        }
      );
    }
  );

  return router;
};
