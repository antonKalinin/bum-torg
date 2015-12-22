var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.json())
app.use(express.static('static'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

var server = app.listen(8010, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});