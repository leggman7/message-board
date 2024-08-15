const express = require('express');
const { v4: uuidv4 } = require('uuid'); // Import UUID library

module.exports = (messages) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.render('new');
  });

  router.post('/', (req, res) => {
    const { title, content } = req.body;
    const message = {
      id: uuidv4(), // Generate a unique ID for each message
      title,
      content,
      timestamp: new Date()
    };
    messages.push(message);
    res.redirect('/');
  });

  return router;
};
