describe('Proxy.Request', function() {
  var proxyRequest = require('../../../lib/proxy/request'),
    MockedResponse = require('../../support/mocked_response'),
    nock = require('nock');

  beforeEach(function() {
    this.memorize({
      host: 'example.com',
      port: 3000,
      config: function() {
        return {
          host: this.host(),
          port: this.port()
        };
      },
      subject: function() {
        return proxyRequest(
          this.config(),
          this.originalRequest(),
          this.response()
        );
      },
      originalRequest: {
        headers: {},
        method: 'GET',
        url: '/path'
      },
      nockScope: function() {
        var url = 'http://' + this.host() + ':' + this.port();
        return nock(url);
      },
      request: function() {
        return this.subject().startRequest();
      }
    });
  });

  describe('#startRequest', function() {
    describe('when finishing the request', function() {
      beforeEach(function(done) {
        this.memorize('response', function() {
          return new MockedResponse();
        });

        this.memorized('nockScope').get(/.*/)
          .reply(500, 'error data');
        this.memorized('request').on('data', function() {
        }).on('end', function() {
          done();
        }).end();
      });

      it('returns a Request', function() {
      });
    });
  });
});
