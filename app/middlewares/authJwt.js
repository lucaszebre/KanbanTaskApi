const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const {supabase} = require('../../supabase.js')

const requireAuth = async (req, res, next) => {
  const session = req.headers.authorization; // Get session token from headers

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Verify the session with Supabase
  const { user } = await supabase.auth.api.getUser(session);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user = user; // Attach the user to the request object
  next();
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, config.secret, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const authJwt = {
  requireAuth,
  checkUser
};
module.exports = authJwt;
