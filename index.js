require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const favicon = require("express-favicon");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT || 8000;

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
if (process.env.NODE_ENV !== "test") {
  app.get("*", function (req, res) {
    const index = path.join(__dirname, "client-ui", "build", "index.html");
    res.sendFile(index);
  });
}

//Routes
app.use("/auth", require("./server/routes/auth"));
app.use("/admin", require("./server/routes/admin"));

app.listen(port, () => {
  console.log(`Products server listening on port ${port}`);
});
