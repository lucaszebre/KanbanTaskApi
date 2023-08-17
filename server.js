const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const  dotenv = require('dotenv');
const app = express();
const mongoose = require('mongoose')
var corsOptions = {
  origin: "https://kanbantask.onrender.com"
};
const authJwt = require("./app/middlewares/authJwt")

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
const db = require("./app/models");
const Role = db.role;
dotenv.config();
const { MONGODB } = process.env;
mongoose.set('strictQuery', true);
db.mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  // app.get('*', authJwt.requireAuth);


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Kanban Task APi by lucaszebre." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/board.routes")(app);
require("./app/routes/task.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


