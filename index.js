const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const favicon = require("express-favicon");
const cors = require("cors");
const bodyParser = require("body-parser");

if (process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, "client-ui", "build", "favicon.ico")));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "client-ui", "build")));
if (!process.env.NODE_ENV === "test") {
  app.get("*", function (req, res) {
    const index = path.join(__dirname, "client-ui", "build", "index.html");
    res.sendFile(index);
  });
}
