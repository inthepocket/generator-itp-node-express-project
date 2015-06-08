var express = require('express');

var router  = express.Router();

// App routes
router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;
