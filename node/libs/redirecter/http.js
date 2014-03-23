var http = require('http');

function redirecter(config){
  var server = http.createServer(function(request, response){
    http.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
  });

  server.listen(5000);
};

module.exports = function(config){
  new redirecter(config);
};

module.exports.fn = redirecter.prototype;
