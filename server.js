var express = require("express");
var app = express();

const port = process.env.PORT || 8081;

app.get("/", function (req, res) {
  res.send("Hello World");
});

var server = app.listen(8081, function () {
  var host = server.address().address;

  console.log("Example app listening at http://%s:%s", host, port);
});
