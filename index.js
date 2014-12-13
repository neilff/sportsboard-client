var express = require('express');
var app = express();

app.use('/build', express.static(__dirname + '/client/build'));

app.all('/*', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port)
});