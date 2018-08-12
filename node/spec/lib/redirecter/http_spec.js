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
    this.memorize({
      port: 3300,
      serverPort: 3000,
      config: function() {
        return {
          port: this.port(),
          proxy: {
            host: 'localhost',
            port: this.serverPort()
          }
        };
      }
    });
  });

  beforeEach(function() {
    this.memorize('subject', function() {
      return RedirecterHttp(this.config());
    });
    this.memorized('subject').listen();
    nock('http://localhost:' + this.memorized('serverPort')).
      get('/').reply(function() {
        return [200, 'data mocked', { 'custom-header': 'header-value' }]
      });
  });

  afterEach(function() {
    this.memorized('subject').stop();
  });

  describe('when performing a get request', function() {
    describe('returning success', function() {
      it('returns the proxied body', function() {
        this.memorized('client').call(function(response) {
          expect(response.body).toEqual('data mocked');
        });
      });

      it('returns the proxied headers', function() {
        this.memorized('client').call(function(response) {
          expect(response.headers['custom-header']).toEqual('header-value');
        });
      });

      it('returns the proxied status', function() {
        this.memorized('client').call(function(response) {
          expect(response.status).toEqual(200);
        });
      });
    });
  });
});
