// auth.js
const jwt = require('jsonwebtoken');
const passport = require('passport');
const express = require('express');
const router = express.Router();

require('./passport'); 

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log('Authentication failed:', err, info); // Debugging line
      return res.status(400).json({
        message: 'Something is not right',
        user: user
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        console.log('Login error:', err); // Debugging line
        res.send(err);
      }
      const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
      return res.json({ user, token });
    });
  })(req, res, next);
});

module.exports = (app) => {
  app.use('/', router);
};
