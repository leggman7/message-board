const express = require('express');


module.exports = (messages) => {
  const router = express.Router();
  
  router.get('/', (req, res) => {
    res.render('index', { messages });
  });

  return router;
};
