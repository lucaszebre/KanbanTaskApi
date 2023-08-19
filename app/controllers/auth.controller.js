const db = require("../models");
const User = db.user;

// exports.initiate = async (req, res) => {
//   try {
    

//     if (error) {
//       return res.status(500).send({ origine:'register', message: error.message });
//     }
//     const NewUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//     });
//     await NewUser.save()
//     res.send({ message: 'User was registered successfully!', user });
//   } catch (error) {
//     res.status(500).send({ origine:'catch error register', message: error.message });
//   }

  
  
//       };


exports.initiate = async (req, res) => {
  try {
    const existingUser = await User.findOne({ userId: req.body.userId });

    if (!existingUser) {
      const newUser = new User({
        userId: req.body.userId,
      });

      await newUser.save();
      return res.status(201).send({ message: "User not found, initiated." });
    } else {
      return res.status(200).send({ message: "User already present in the database." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};




// exports.logout = (req, res) => {
//   supabase.auth.signOut();
//   res.redirect('/');
// };
