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
        method: 'POST',
        url: '/path'
      },
      postData: '{"id":1}',
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
        var context = this;

        this.memorize('response', function() {
          return new MockedResponse();
        });

        this.dependency(function(dependencyDone) {
          this.nockScope().post(/.*/).reply(function(path, data) {
            context.memorize('requestedPath', path);
            context.memorize('requestedData', data);
            dependencyDone();
            return [200, 'the data'];
          });
        });

        this.dependency(function(dependencyDone) {
          this.request().write(this.postData());
          this.requestHandler().onEnd(function() {
            dependencyDone();
          }).perform();
        });

        this.dependent(done);
      });

      it('pipes the path from the request', function(done) {
        this.dependent(function() {
          expect(this.requestedPath()).toEqual('/path');
          done();
        });
      });

      it('pipes the data from the request', function(done) {
        this.dependent(function() {
          expect(this.requestedData()).toEqual(this.postData());
          done();
        });
      });
    });
  });
});
