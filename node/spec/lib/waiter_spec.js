describe('Waiter', function() {
  var Waiter = require('../support/event_waiter');

  describe('#execute', function() {
    describe('when not defining the context', function() {
      beforeEach(function() {
        this.id = Math.floor(Math.random() * 1000);
        this.waiter = new Waiter();
      });

      it('it runs the block with waiter for context', function() {
        var innerContext;

        this.waiter.run(function() {
          innerContext = this;
        });

        expect(innerContext).toEqual(this.waiter);
      });

      describe('when adding a dependency', function() {
        it('runs the dependency with waiter for context', function() {
          var innerContext;

          this.waiter.addDependency(function() {
            innerContext = this;
          });

          expect(innerContext).toEqual(this.waiter);
        });
      });
    });

    describe('when defining the context', function() {
      beforeEach(function() {
        this.id = Math.floor(Math.random() * 1000);
        this.waiter = new Waiter(this);
      });

      it('it runs the block with the given context', function() {
        var context = this,
          innerContext;

        this.waiter.run(function() {
          innerContext = this;
        });

        expect(innerContext).toEqual(context);
      });

      describe('when adding a dependency', function() {
        it('runs the dependency with the given context', function() {
          var context = this,
            innerContext;

          this.waiter.addDependency(function() {
            innerContext = this;
          });

          expect(innerContext).toEqual(context);
        });
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
          this.waiter.addDependency(function(done) {
            this.firstDependency = function() {
              done();
            };
          });
        });

        describe('and it has not been called', function() {
          it('does not run the given block right away', function() {
            var called = false;

            this.waiter.run(function() {
              called = true;
            });

            expect(called).toBeFalsy();
          });

          describe('and it runs before the block is added', function() {
            beforeEach(function() {
              this.firstDependency()
            });

            it('it runs the block right away', function() {
              var called = false;

              this.waiter.run(function() {
                called = true;
              });

              expect(called).toBeTruthy();
            });
          });

          describe('and the dependency is run after the block has been added', function() {
            xit('does runs the given block after the dependency', function() {});
          });
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
