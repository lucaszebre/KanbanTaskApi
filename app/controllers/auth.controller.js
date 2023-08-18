const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const maxAge = 3 * 24 * 60 * 60;

exports.register = (req, res) => {

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
          res.send({ message: "User was registered successfully!", user });
        });
  
      };


exports.login = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign(
        { id: user.id },
        config.secret,
        {
          algorithm: 'HS256',
          expiresIn: '1000000000000000000', // 24 hours
        }
      );
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

      res.status(200)
      .header('Authorization', 'Bearer ' + token)
      .send({
        id: user._id,
        username: user.username,
        email: user.email,
      });
    });
};



exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}