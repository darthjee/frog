
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
  });

  afterAll(function() {
    server.stop();
  });

  beforeEach(function() {
    subject = new RedirecterHttp(config);
    subject.listen();
  });

  it('a', function() {
    new EasyClient({
      hostname: 'localhost',
      port: 3000
    }).call(
      function(data) {
        console.info(data);
      }
    );
  });
});
