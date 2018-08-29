var express = require('express'),
  app = express();

app.get('/', function(_request, response) {
  response.redirect('/home');
});

app.get('/home', function(_request, response) {
  response.send('Home');
});

app.get('/servers', function(_request, response) {
  response.send('servers');
});

app.get('/servers/:id', function(_request, response) {
  response.send('servers id');
  console.info(_request.params);
});

app.get(/.*/, function(_request, response) {
  response.send('Star');
});

app.listen(3000);


