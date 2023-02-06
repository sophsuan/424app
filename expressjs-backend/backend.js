const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");
const bodyParser = require("body-parser");

//app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let database = [
  {
    userid: "bj",
    password: "pass424",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  res.send(database);
});

app.get("/user", (req, res) => {
  res.send(database.find((item) => item.userid === req.body.userid));
});

// takes JSON {userid, password}, return token if user and password exist in table
app.post("/account/login", (req, res) => {
  let userid = req.body.userid;
  let password = req.body.password;
  if (userid && password) {
    if (
      database.find(
        (item) => item.userid === userid && item.password === password
      )
    ) {
      res.send("2342f2f1d131rf12");
      res.status(200);
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// password validation is happening in frontend with react-hooks-form library's help and regex
app.post("/account/register", (req, res) => {
  let userid = req.body.userid;
  let password = req.body.password;
  if (userid && password) {
    database.push({ userid, password });
    res.send({ userid, password });
    res.status(200);
  } else {
    res.status(400);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
