let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let User = mongoose.model('User');

let users = [];

router.get('/', ((req, res, next) => {
  User.find({}, ((err, users) => {
    if(err) {
      res.send(err);
    } else {
      res.json(users);
    }
  }))
}));

router.post('/', ((req, res, next) => {
  let newUser = new User();
  newUser.email = req.body.email;
  newUser.setPassword(req.body.password);

  newUser.save((err) => {
    if(err) {
      res.send(err);
    } else {
      res.sendStatus(200);
    }
  })
  
}));

router.put('/', ((req, res, next) => {
  User.findById(req.body.id, function (err, user) {
    user.username = req.body.username;

    user.save((err) => {
      res.send(user);
    }, ((err) => {
      res.send(err);
    }))
  })
}));

router.delete('/:id', ((req, res, next) => {
  User.remove({_id: req.params['id']}, ((err) => {
    res.sendStatus(200);
  }, ((err) => {
    res.send(err);
  })))
}));

module.exports = router;
