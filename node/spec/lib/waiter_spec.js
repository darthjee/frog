describe('Waiter', function() {
  var Waiter = require('../support/waiter');

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
        beforeEach(function () {
          var context = this;

          context.called = 0;

          this.waiter.run(function() {
            context.called++;
          });
        });

        it('runs the given block right away', function() {
          expect(this.called).toEqual(1);
        });

        describe('and we add and finish a dependency after the block has been ran', function() {
          beforeEach(function() {
            this.waiter.addDependency(function(done) {
              done();
            });
          });

          it('does not run the block again', function() {
            expect(this.called).toEqual(1);
          });
        });
      });

      describe('when there are dependencies', function() {
        beforeEach(function() {
          this.waiter.addDependency(function(done) {
            this.firstDependency = done;
          });
        });

        describe('and it has not been called', function() {
          describe('and a block is added', function() {
            beforeEach(function () {
              var context = this;

              context.called = 0;

              this.waiter.run(function() {
                context.called++;
              });
            });

            it('does not run the given block right away', function() {
              expect(this.called).toEqual(0);
            });

            describe('and the dependency is run after the block has been added', function() {
              beforeEach(function() {
                this.firstDependency();
              });

              it('does runs the given block after the dependency', function() {
                expect(this.called).toEqual(1);
              });

              describe('and another dependency is added and finished', function() {
                beforeEach(function() {
                  this.waiter.addDependency(function(done) {
                    done();
                  });
                });

                it('does not run the given block again', function() {
                  expect(this.called).toEqual(1);
                });
              });
            });
          });

          describe('and it runs before the block is added', function() {
            beforeEach(function() {
              this.firstDependency();
            });

            it('it runs the block right away', function() {
              var called = false;

              this.waiter.run(function() {
                called = true;
              });

              expect(called).toBeTruthy();
            });
          });
        });

        describe('when there are more than one dependencies', function() {
          beforeEach(function() {
            this.waiter.addDependency(function(done) {
              this.secondDependency = done;
            });
            this.waiter.addDependency(function(done) {
              this.thirdDependency = done;
            });
          });

          describe('and only one has been called', function() {
            beforeEach(function() {
              this.firstDependency();
            });

            it('does not run the code', function() {
              var called = false;

              this.waiter.run(function() {
                called = true;
              });

              expect(called).toBeFalsy();
            });

            describe('after another, but not all have been called', function() {
              beforeEach(function() {
                this.secondDependency();
              });

              it('does not run the code', function() {
                var called = false;

                this.waiter.run(function() {
                  called = true;
                });

                expect(called).toBeFalsy();
              });
            });

            describe('when running the same dependencies several times', function() {
              beforeEach(function() {
                this.secondDependency();
                this.secondDependency();
              });

              it('does not run the code', function() {
                var called = false;

                this.waiter.run(function() {
                  called = true;
                });

                expect(called).toBeFalsy();
              });
            });

            describe('after all dependencies have been called', function() {
              beforeEach(function() {
                this.secondDependency();
                this.thirdDependency();
              });

              it('runs the code', function() {
                var called = false;

                this.waiter.run(function() {
                  called = true;
                });

                expect(called).toBeTruthy();
              });
            });
          });
        });
      });
    });
  });

  describe('with memorized', function() {
    beforeEach(function() {
      var context = this;

      this.memorize('variable', Math.floor(Math.random() * 1000));

      this.dependency(function(done) {
        context.context = this;

        context.firstDependency = done;
      });
    });

    it('run in the context of memorized', function() {
      var context = this.memorized(function() {
        return this;
      });
      expect(this.context).toEqual(context);
    });

    describe('when dependency has not been called', function() {
      beforeEach(function() {
        var context = this;

        this.called = false;

        this.dependent(function() {
          context.called = true;
        });
      });

      it('does not run the code', function() {
        expect(this.called).toBeFalsy();
      });

      describe('when dependency finished after test', function() {
        beforeEach(function() {
          this.firstDependency();
        });

        it('runs the code', function() {
          expect(this.called).toBeTruthy();
        });
      });
    });
  });
});
