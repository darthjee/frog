describe('Waiter', function() {
  var Waiter = require('../support/event_waiter');

  describe('#execute', function() {
    describe('when defining the context', function() {
      beforeEach(function() {
        this.waiter = new Waiter(this);
      });

      describe('when there are no dependencies', function() {
        it('runs the given block right away', function() {
          var called = false;

          this.waiter.run(function() {
            called = true;
          });

          expect(called).toBeTruthy();
        });
      });

      describe('when there are dependencies', function() {
        beforeEach(function() {
          this.waiter.addDependency(function() {});
        });

        describe('and it has not been called', function() {
          it('does not run the given block right away', function() {
            var called = false;

            this.waiter.run(function() {
              called = true;
            });

            expect(called).toBeFalsy();
          });

          describe('after the dependency is ran', function() {
            xit('it runs the block', function() {});
          });
        });

        describe('and it has been called', function() {
          xit('does runs the given block right away', function() {});
        });

        describe('when there are more than one dependencies', function() {
          describe('and only one has been called', function() {
            xit('does not run the code', function() {});

            describe('after another, but not all have been called', function() {
              xit('does not run the code', function() {});
            });

            describe('when running the same dependencies several times', function() {
              xit('does not run the code', function() {});
            });

            describe('after all dependencies have been called', function() {
              xit('runs the code', function() {});
            });
          });
        });
      });
    });
  });
});
