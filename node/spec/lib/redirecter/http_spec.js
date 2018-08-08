describe('Redirecter::Http', function() {
  var RedirecterHttp = require('../../../lib/redirecter/http'),
      DummyServer = require('../../support/dummy_server'),
      EasyClient = require('../../support/easy_client'),
      Http = require('http'),
      server,
      subject;

  beforeAll(function(){
    server = new DummyServer();
    server.start();
    client = new EasyClient({
      hostname: 'localhost',
      port: 3000
    });
    this.memorize('config', function() { return {} });
  });

  afterAll(function() {
    server.stop();
  });

  beforeEach(function() {
    this.memorize('subject', function() {
      return RedirecterHttp(this.config());
    });
    this.memorized('subject').listen();
  });

  describe('when performing a get request', function() {
    it('request to server', function() {
      client.call(function(data) {
        console.info(data);
      });
    });
  });
});
