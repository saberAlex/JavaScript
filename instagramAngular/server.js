var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");


app.use(express.static(__dirname + "/public")); //declaring the public folder
app.use(morgan("dev")); //for logging
app.use(bodyParser.urlencoded({"extended" : "true"}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

app.listen(3000);
console.log("App is listening in the port 3000");