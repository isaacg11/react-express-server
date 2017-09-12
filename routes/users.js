let express = require('express');
let passport = require('passport');
let jwt = require('jsonwebtoken');
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

router.post('/signup', ((req, res, next) => {
  let newUser = new User();
  newUser.username = req.body.username;
  newUser.setPassword(req.body.password);

  newUser.save((err) => {
    if(err) {
      res.send(err);
    } else {
      res.sendStatus(200);
    }
  })

}));

router.post('/login', ((req, res, next) => {
  passport.authenticate('local', function(err, user, info){
      if(err){
        return next(err);
      }
      if(user){
        return res.json({token: user.generateJWT()});
      }
      return res.status(400).send(info);
    })(req, res, next);
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
