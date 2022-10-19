var express = require("express");
const path = require("path");
var ejs = require("ejs");
require("dotenv").config();
var bodyParser = require("body-parser");
var app = express();

const index =  require("./routes/index");
const admin =  require("./routes/admin");


//MIDDLEWARE
app.use(express.static(__dirname + "/public"));
// set the view engine to ejs
app.set("view engine", "ejs");

//allows express to pass data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", index);
//app.use("/admin", admin);

app.listen(8080);
console.log("Server is listening on port 8080");
