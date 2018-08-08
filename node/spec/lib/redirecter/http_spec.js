
describe('Redirecter::Http', function() {
  var RedirecterHttp = require('../../../lib/redirecter/http'),
      DummyServer = require('../../support/dummy_server'),
      Http = require('http'),
      config = {},
      server,
      subject;

  beforeAll(function(){
    server = new DummyServer();
    server.start();
  });

  afterAll(function() {
    server.stop();
  });

  beforeEach(function() {
    subject = new RedirecterHttp(config);
    subject.listen();
  });

  it('a', function() {
    var a = Http.request({
      hostname: 'localhost',
      port: 3000
    }).on('response', function(response) {
      response.on('data', function(buffer, a) {
        console.info('buffer');
        console.info(buffer.toString());
      });
      response.on('end', function() {
        console.info('ended');
      });
    }).end(function() {
      console.info('hey');
    });
  });
});
