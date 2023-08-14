const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {


  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token,
            config.secret,
            (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              User.findById(decoded.id, (err, user) => {
                if (err) {
                  return res.status(500).json({ message: 'Error retrieving user' });
                }
                if (!user) {
                  return res.status(404).json({ message: 'User not found' });
                }
                req.userId = decoded.id;
                next();
              });
            });
};

authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token,config.secret, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }

          req.user = user;
          next();
      });
  } else {
    console.log('2en error')
      res.sendStatus(401);
  }
};


const authJwt = {
  verifyToken,
  authenticateJWT
};
module.exports = authJwt;
