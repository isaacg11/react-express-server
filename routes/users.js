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

router.put('/', function(req, res, next) {
  for(let i = 0; i < users.length; i++) {
    if(users[i].id === req.body.id) {
      users[i].username = req.body.username;
    } else {
      continue;
    }
  }

  res.send(users);
})

router.delete('/:id', function(req, res, next) {
  for(let i = 0; i < users.length; i++) {
    if(users[i].id === parseInt(req.params['id'])) {
      users.splice(i, 1);
    } else {
      continue;
    }
  }

  res.send(users);
})

module.exports = router;
