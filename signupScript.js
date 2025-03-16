var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require("mongoose");
const { match } = require("assert");
mongoose.connect(
  "mongodb+srv://userLogin:y7NaEfDttsDu6hgJ@cluster0.w7pqm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { dbName: "userDB" }
);
var db = mongoose.connection;

var app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/sign_up", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var pass = req.body.password;

  var data = {
    name: name,
    email: email,
    password: pass,
  };

  db.collection("userLogin").insertOne(data, function (err, collection) {
    if (err) throw err;
  });

  /* will need to replace temp.html with actual login page once it is made */
  return res.redirect("temp.html");
});

app
  .get("/", function (req, res) {
    res.set({
      "Access-control-Allow-Origin": "*",
    });
    return res.redirect("signup.html");
  })
  .listen(3000);
