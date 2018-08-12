describe('Redirecter::Http', function() {

  var RedirecterHttp = require('../../../lib/redirecter/http'),
      EasyClient = require('../../support/easy_client'),
      nock = require('nock'),
      Http = require('http'),
      server,
      subject;

  beforeAll(function(){
    this.memorize('client', function() {
      return new EasyClient({
        hostname: 'localhost',
        port: this.port()
      });
    });
    this.memorize('port', 3300);
    this.memorize('serverPort', 3000);
    this.memorize('config', function() {
      return {
        port: this.port(),
        proxy: {
          host: 'localhost',
          port: this.serverPort()
        }
      };
    });
    nock('http://localhost:' + this.memorized('serverPort')).
      get('/').reply(200, 'data mocked');
  });

  beforeEach(function() {
    this.memorize('subject', function() {
      return RedirecterHttp(this.config());
    });
    this.memorized('subject').listen();
  });

  describe('when performing a get request', function() {
    it('request to server', function() {
      this.memorized('client').call(function(data) {
        console.info(data);
      });
    });
  });
});
