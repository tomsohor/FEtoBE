const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;

// support parsing of application/json type post data
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/tasklist", require("./tasklist"));

//handle production
if (process.env.NODE_ENV === "production") {
  // Static folder
  app.use(express.static(__dirname + "/public/"));

  //handle single page
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

app.listen(port, () => {
  console.log(`connect to port:${port}`);
});
