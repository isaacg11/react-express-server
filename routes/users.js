let express = require('express');
let router = express.Router();

let users = [];

router.get('/', function(req, res, next) {
  res.json(users);
});

router.post('/', function(req, res, next) {
  users.push(req.body);
  res.send(users);
});

module.exports = router;
