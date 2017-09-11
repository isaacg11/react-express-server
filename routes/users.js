let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let User = mongoose.model('User');

let users = [];

router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    if(err) {
      res.send(err);
    } else {
      res.json(users);
    }
  })
});

router.post('/', function(req, res, next) {
  let newUser = new User({
    username: req.body.username
  })

  newUser.save((err) => {
    res.sendStatus(200);
  }, ((err) => {
    res.send(err);
  }))

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
