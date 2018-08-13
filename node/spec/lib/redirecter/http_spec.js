describe('Redirecter::Http', function() {

  var RedirecterHttp = require('../../../lib/redirecter/http'),
      EasyClient = require('../../support/easy_client'),
      nock = require('nock'),
      Http = require('http'),
      server,
      subject;

  beforeAll(function(){
    this.memorize({
      port: 3300,
      serverPort: 3000,
      path: '/success',
      config: function() {
        return {
          port: this.port(),
          proxy: {
            host: 'localhost',
            port: this.serverPort()
          }
        };
      },
      client: function() {
        return new EasyClient({
          hostname: 'localhost',
          port: this.port(),
          path: this.path(),
          method: this.method(),
          headers: { 'X-REQUEST': '#ABC' }
        });
      },
      subject: function() {
        return RedirecterHttp(this.config());
      },
      nockScope: function() {
        return nock('http://localhost:' + this.serverPort())
        .matchHeader('X-REQUEST', '#ABC');
      }
    });

    this.memorized('subject').listen();
  });

  afterAll(function() {
    this.memorized('subject').stop();
  });

  describe('when performing a GET request', function() {
    beforeAll(function() {
      this.memorize('method', 'GET');
    });
    describe('returning success', function() {
      beforeAll(function(done) {
        this.memorize('path', '/success');
        var context = this;

        this.memorized('nockScope').get(/.*/)
          .reply(200, 'success data', {
            'custom-header': 'header-value'
          });

        this.memorized('client').call(function(response) {
          context.response = response;
          done();
        })
      });

      it('returns the proxied body', function() {
        expect(this.response.body).toEqual('success data');
      });

      it('returns the proxied headers', function() {
        expect(this.response.headers['custom-header']).toEqual('header-value');
      });

      it('returns the proxied status', function() {
        expect(this.response.status).toEqual(200);
      });
    });

    describe('returning error', function() {
      beforeAll(function(done) {
        this.memorize('path', '/error');
        var context = this;

        this.memorized('nockScope').get(/.*/)
          .reply(500, 'error data');

        this.memorized('client').call(function(response) {
          context.response = response;
          done();
        })
      });

      it('returns the proxied body', function() {
        expect(this.response.body).toEqual('error data');
      });

      it('returns the proxied status', function() {
        expect(this.response.status).toEqual(500);
      });
    });
  });

  describe('when performing a POST request', function() {
    beforeAll(function() {
      this.memorize('method', 'POST');
    });
    describe('returning success', function() {
      beforeAll(function(done) {
        this.memorize('path', '/success');
        var context = this;

        this.memorized('nockScope').post(/.*/)
          .reply(200, 'success data', {
            'custom-header': 'header-value'
          });

        this.memorized('client').call(function(response) {
          context.response = response;
          done();
        })
      });

      it('returns the proxied body', function() {
        expect(this.response.body).toEqual('success data');
      });

      it('returns the proxied headers', function() {
        expect(this.response.headers['custom-header']).toEqual('header-value');
      });

      it('returns the proxied status', function() {
        expect(this.response.status).toEqual(200);
      });
    });

    describe('returning error', function() {
      beforeAll(function(done) {
        this.memorize('path', '/error');
        var context = this;

        this.memorized('nockScope').post(/.*/)
          .reply(500, 'error data');

        this.memorized('client').call(function(response) {
          context.response = response;
          done();
        })
      });

      it('returns the proxied body', function() {
        expect(this.response.body).toEqual('error data');
      });

      it('returns the proxied status', function() {
        expect(this.response.status).toEqual(500);
      });
    });
  });
});
