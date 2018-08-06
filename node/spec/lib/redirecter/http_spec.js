
describe('Redirecter::Http', function() {
  var RedirecterHttp = require('../../../lib/redirecter/http'),
      Server = require('../../support/server'),
      config = {},
      server,
      subject;

  beforeEach(function() {
    subject = new RedirecterHttp(config);
    server = new Server();
  });

  it('hey ho', function() {});
});
