redirecter = require('./libs/redirecter/http.js');

redirecter({
  before: function(request, response){
    return true;
  }
}).listen();
