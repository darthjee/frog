redirecter = require('./libs/redirecter/http.js');

redirecter({}, function(request, response){
  return true;
}).listen();
