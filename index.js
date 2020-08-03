const express = require("express");
const bodyParser = require("body-parser");
const favicon = require("express-favicon");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(
  favicon(path.join(__dirname, "..", "client-ui", "build", "favicon.ico"))
);
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "..", "client-ui", "build")));
if (process.env.NODE_ENV !== "test") {
  app.get("*", function (req, res) {
    const index = path.join(
      __dirname,
      "..",
      "client-ui",
      "build",
      "index.html"
    );
    res.sendFile(index);
  });
}
