describe('Proxy.Request', function() {
  var proxyRequest = require('../../../lib/proxy/request'),
    MockedResponse = require('../../support/mocked_response'),
    nock = require('nock'),
    RequestHandler = require('../../support/easy_client/request_handler');

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
      },
      requestHandler: function() {
        return new RequestHandler(this.request(), {
          data: function() {
            //console.info(arguments)
          }
        });
      }
    });
  });

  describe('#startRequest', function() {
    describe('when finishing the request', function() {
      beforeEach(function(done) {
        this.memorize('response', function() {
          return new MockedResponse();
        });

        this.memorized(function() {
          this.nockScope().get(/.*/)
            .reply(200, 'the data');
          this.requestHandler().perform();
        });
      });

      it('returns a Request', function() {
        expect(this.memorized('request').finished).toBeTruthy();
      });
    });
  });
});
