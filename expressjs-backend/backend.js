const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");
const bodyParser = require("body-parser");
//app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const mongoose = require("mongoose");
const userModel = require("./models/user");
mongoose.set({ debug: true, strictQuery: false });
const https = require("https");
const userServices = require("./models/user-services");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
var privateKEY = fs.readFileSync("./private.key", "utf8");

const auth = require("./auth");
/* to protect an endpoint
// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});
*/
require("dotenv").config();

mongoose
  .connect(
    /* move this into .env */
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@424.66g3lry.mongodb.net/users_list`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Successful connection to MongoDB"))
  .catch((error) =>
    console.log("Failed connection to MongoDB: ", error.message)
  );

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// https://stackoverflow.com/questions/2794137/sanitizing-user-input-before-adding-it-to-the-dom-in-javascript
function sanitize(string) {
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match)=>(map[match]));
}

//app.get("/users", auth, async (req, res) => { // this version will be used to protect this route once axios error is resolved
app.get("/users", async (req, res) => {
  try {
    let result = await userModel.find();
    console.log(result);
    res.send(result);
  } catch (e) {
    res.status(500).send({ message: "cannot get users", e });
  }
});

app.post("/users/login", async (req, res) => {
  try {
    var user = await userModel.findOne({ id: req.body.userid }).exec();
    if (!user) {
      return res.status(400).send({ message: "The username does not exist" });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return response.status(400).send({ message: "The password is invalid" });
    }
    const token = jwt.sign(
      {
        userId: req.body.userid,
      },
      privateKEY,
      { expiresIn: "1800s", algorithm: "RS256" }
    );
    // return success response
    res.status(200).send({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "cannot authenticate", error });
  }
});

// password validation is happening in frontend with react-hooks-form library's help and regex
app.post("/users/register", async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = new userModel({
      id: req.body.userid,
      password: req.body.password,
      token: null,
    });

    var result = await user
      .save()
      .then((result) => {
        console.log("success");
        res.status(201).send({
          message: "user created successfully",
          sanitize(result),
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: "error creating user",
          error,
        });
      });
    res.send(sanitize(result));
  } catch (error) {
    res.status(500).send({
      message: "password was not hashed successfully",
      error,
    });
  }
});

https
  .createServer(
    {
      key: fs.readFileSync("./expresscert/key.pem"),
      cert: fs.readFileSync("./expresscert/cert.pem"),
    },
    app
  )
  .listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
  });

/* referenced for login route */
// https://www.thepolyglotdeveloper.com/2019/02/hash-password-data-mongodb-mongoose-bcrypt/
