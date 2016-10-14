const express = require('express');

const router  = express.Router();

// Define app routes
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
