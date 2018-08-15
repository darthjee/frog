var proxy = require('./lib/redirecter/http.js');

proxy({
  before: function(){
    return true;
  }
}).listen();
