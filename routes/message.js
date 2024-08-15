const express = require('express');

module.exports = (messages) => {
  const router = express.Router();

  router.get('/:id', (req, res) => {
    const message = messages.find(m => m.id === req.params.id);
    if (!message) {
      return res.status(404).send('Message not found');
    }
    res.render('message', { message });
  });

  return router;
};
