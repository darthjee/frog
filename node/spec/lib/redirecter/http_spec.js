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
      status: 200,
      body: 'data mocked',
      headers: { 'custom-header': 'header-value' },
      response: function () {
        var that = this;

        return function() {
          return [
            that.status(),
            that.body(),
            that.headers()
          ]
        };
      },
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
    this.memorize('subject', function() {
      return RedirecterHttp(this.config());
    });
    this.memorized('subject').listen();
    nock('http://localhost:' + this.memorized('serverPort')).
      get('/').reply(this.memorized('response'));
  });

  afterAll(function() {
    this.memorized('subject').stop();
  });

  describe('when performing a get request', function() {
    describe('returning success', function() {
      beforeAll(function(done) {
        var that = this;

        this.memorized('client').call(function(response) {
          that.response = response;
          done();
        })
      });

      it('returns the proxied body', function() {
        expect(this.response.body).toEqual('data mocked');
      });

      it('returns the proxied headers', function() {
        expect(this.response.headers['custom-header']).toEqual('header-value');
      });

      it('returns the proxied status', function() {
        expect(this.response.status).toEqual(200);
      });
    });
  });
});
