const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const supabase = require('../../supabase.js').supabase;

exports.register = async (req, res) => {
  try {
    const { user, error } = await supabase.auth.signUp({  //    "message": "Cannot read properties of undefined (reading 'signUp')"

      email: req.body.email,
      password: req.body.password,
    });

    if (error) {
      return res.status(500).send({ origine:'register', message: error.message });
    }
    const NewUser = new User({
      username: req.body.username,
      email: req.body.email,
    });
    await NewUser.save()
    res.send({ message: 'User was registered successfully!', user });
  } catch (error) {
    res.status(500).send({ origine:'catch error register', message: error.message });
  }

  
  
      };


exports.login = async (req, res) => {
const LogingUser=  User.findOne({
    username: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

    })
  try {
    const { user, session, error } = await supabase.auth.signIn({
      email: req.body.email, // Use email or username as per Supabase requirements
      password: req.body.password,
    });

    if (error) {
      return res.status(401).send({ message: 'Invalid login credentials' });
    }


    res.status(200).send({
      id: LogingUser._id,
      email: LogingUser.email,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }

    if (error) {
      return res.status(401).send({ message: 'Invalid login credentials' });
    }

  
};



exports.logout = (req, res) => {
  supabase.auth.signOut();
  res.redirect('/');
};
