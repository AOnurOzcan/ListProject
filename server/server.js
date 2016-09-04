var express = require('express');
var fs = require('fs');
var app = express();

try {
  fs.accessSync('./client/build');
  app.use(express.static('./client/build'));
} catch (e) {
  app.use(express.static('./client'));
}

app.use(express.static('./client/app'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
