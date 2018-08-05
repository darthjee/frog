redirecter = require('./lib/redirecter/http.js');

redirecter({
  before: function(request, response){
    return true;
  }
}).listen();
