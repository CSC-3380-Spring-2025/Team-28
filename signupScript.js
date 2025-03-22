const mongoose = require("mongoose");
const { Schema } = mongoose;

var express = require("express");
var bodyParser = require("body-parser");

const { match } = require("assert");
mongoose.connect(
  "mongodb+srv://userLogin:y7NaEfDttsDu6hgJ@cluster0.w7pqm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { dbName: "userDB" }
);
var db = mongoose.connection;

var app = express();

var userSchema = new Schema({
  userName: { type: String, default: "NULL" },
  userEmail: { type: String, default: "NULL" },
  userAge: { type: Number, min: 18, index: true },
  userBio: { type: String, match: /[a-zA-Z ]/ },
  userDate: { type: Date, default: Date.now },
  userPass: { type: String, default: "NULL" },
});

var userModel = mongoose.model("User", userSchema);



app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/sign_up", function (req, res) {
  var userName = req.body.userName;
  var userEmail = req.body.userEmail;
  var userPass = req.body.userPass;

  var data = new userModel({
    userName: userName,
    userEmail: userEmail,
    userPass: userPass,
  });

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
