
describe('Redirecter::Http', function() {
  var RedirecterHttp = require('../../../lib/redirecter/http'),
      DummyServer = require('../../support/dummy_server'),
      EasyClient = require('../../support/easy_client'),
      Http = require('http'),
      config = {},
      server,
      subject;

  beforeAll(function(){
    server = new DummyServer();
    server.start();
    client = new EasyClient({
      hostname: 'localhost',
      port: 3000
    });
  });

  afterAll(function() {
    server.stop();
  });

  beforeEach(function() {
    subject = new RedirecterHttp(config);
    subject.listen();
  });

  describe('when performing a get request', function() {
    it('request to server', function() {
      client.call(function(data) {
        console.info(data);
      });
    });
  });
});
