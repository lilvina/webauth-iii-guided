const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const secrets = require('../api/secrets.js')

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if(token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if(err) {
        //token isn't valid
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        //token is valid
        req.decodedJwt = decodedToken
        next()
      }
    })
  } else {
    res.status(401).json({ message: 'No token provided' });

  }
};
