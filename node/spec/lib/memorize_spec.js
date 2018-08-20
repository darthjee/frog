describe('Memorize', function() {
  describe('when setting it on beforeAll ', function() {
    beforeAll(function() {
      this.memorize('object', function() {
        return { id: 1 };
      });

      this.memorize('object2', { id: 2 });

      this.memorize({
        object3: function() {
          return { id: 3 };
        },
        object4: { id: 4 }
      });
    });

    describe('when retrieving the value memorized with a function', function() {
      it('returns the memorized object', function() {
        expect(this.memorized('object')).toEqual({ id: 1 });
      });

      describe('when changing the value of the object within the test', function () {
        it('remember the change within the test', function() {
          expect(this.memorized('object')).toEqual({ id: 1 });
          this.memorized('object').id = 10;
          expect(this.memorized('object')).toEqual({ id: 10 });
        });

        it('does not affect another test', function() {
          expect(this.memorized('object')).toEqual({ id: 1 });
        });
      });
    });

    describe('when retrieving the value memorized with a value', function() {
      it('returns the memorized object', function() {
        expect(this.memorized('object2')).toEqual({ id: 2 });
      });
    });

    describe('when retrieving the value memorized with a function inside a hash', function() {
      it('returns the memorized object', function() {
        expect(this.memorized('object3')).toEqual({ id: 3 });
      });
    });

    describe('when retrieving the value memorized with a value inside a hash', function() {
      it('returns the memorized object', function() {
        expect(this.memorized('object4')).toEqual({ id: 4 });
      });
    });

    describe('when overriding with a beforeEach', function() {
      beforeEach(function() {
        this.memorize('object', function() {
          return { id: 5 };
        });

        this.memorize('object2', { id: 6 });

        this.memorize({
          object3: function() {
            return { id: 7 };
          },
          object4: { id: 8 }
        });
      });

      describe('when retrieving the value memorized with a function', function() {
        it('returns the memorized object', function() {
          expect(this.memorized('object')).toEqual({ id: 5 });
        });
      });

      describe('when retrieving the value memorized with a value', function() {
        it('returns the memorized object', function() {
          expect(this.memorized('object2')).toEqual({ id: 6 });
        });
      });

      describe('when retrieving the value memorized with a function inside a hash', function() {
        it('returns the memorized object', function() {
          expect(this.memorized('object3')).toEqual({ id: 7 });
        });
      });

      describe('when retrieving the value memorized with a value inside a hash', function() {
        it('returns the memorized object', function() {
          expect(this.memorized('object4')).toEqual({ id: 8 });
        });
      });

      describe('when overriding with beforeAll', function() {
        beforeAll(function() {
          this.memorize('object', function() {
            return { id: 9 };
          });

          this.memorize('object2', { id: 10 });

          this.memorize({
            object3: function() {
              return { id: 11 };
            },
            object4: { id: 12 }
          });
        });

        describe('when retrieving the value memorized with a function', function() {
          it('returns the memorized object', function() {
            expect(this.memorized('object')).toEqual({ id: 5 });
          });
        });

        describe('when retrieving the value memorized with a value', function() {
          it('returns the memorized object', function() {
            expect(this.memorized('object2')).toEqual({ id: 6 });
          });
        });

        describe('when retrieving the value memorized with a function inside a hash', function() {
          it('returns the memorized object', function() {
            expect(this.memorized('object3')).toEqual({ id: 7 });
          });
        });

        describe('when retrieving the value memorized with a value inside a hash', function() {
          it('returns the memorized object', function() {
            expect(this.memorized('object4')).toEqual({ id: 8 });
          });
        });
      });
    });

    describe('when overriding with beforeAll', function() {
      beforeAll(function() {
        this.memorize('object', function() {
          return { id: 9 };
        });

        this.memorize('object2', { id: 10 });

        this.memorize({
          object3: function() {
            return { id: 11 };
          },
          object4: { id: 12 }
        });
      });

      describe('when retrieving the value memorized with a function', function() {
        it('returns the memorized object', function() {
          expect(this.memorized('object')).toEqual({ id: 9 });
        });
      });

      describe('when retrieving the value memorized with a value', function() {
        it('returns the memorized object', function() {
          expect(this.memorized('object2')).toEqual({ id: 10 });
        });
      });

      describe('when retrieving the value memorized with a function inside a hash', function() {
        it('returns the memorized object', function() {
          expect(this.memorized('object3')).toEqual({ id: 11 });
        });
      });

      describe('when retrieving the value memorized with a value inside a hash', function() {
        it('returns the memorized object', function() {
          expect(this.memorized('object4')).toEqual({ id: 12 });
        });
      });
    });
  });

  describe('when calling memorized twice inside the same example', function() {
    beforeEach(function() {
      var context = this;
      context.called = 0;

      context.memorize('object', function() {
        context.called = context.called + 1;
        return { id: 1 };
      });
    });

    it('does not call the function twice', function () {
      this.memorized('object');
      this.memorized('object');

      expect(this.called).toEqual(1);
    });

    describe('when another memorizaton calls for the first one', function() {
      beforeEach(function() {
        this.memorize('object2', function() {
          this.object();
          return { id: 2 };
        });
      });

      xit('does not call the function twice', function () {
        this.memorized('object2');
        this.memorized('object');

        expect(this.called).toEqual(1);
      });
    });
  });

  describe('when calling memorized value within a memorized function', function() {
    describe('defining everything on a beforeAll', function() {
      beforeAll(function() {
        this.memorize({
          object: function() {
            return { id: 100 };
          },
          object2: function() {
            return { obj1: this.object() };
          }
        });
      });

      it('returns the inner object in the inner call', function() {
        expect(this.memorized('object2')).toEqual({ obj1: { id: 100 } });
      });

      describe('when overriding inner object', function() {
        describe('in a beforeEach', function() {
          beforeEach(function() {
            this.memorize('object', function() {
              return { id: 101 };
            });
          });

          it('accepts the override', function() {
            expect(this.memorized('object2')).toEqual({ obj1: { id:101 } });
          });
        });

        describe('in a beforeAll', function() {
          beforeAll(function() {
            this.memorize('object', function() {
              return { id: 102 };
            });
          });

          it('accepts the override', function() {
            expect(this.memorized('object2')).toEqual({ obj1: { id:102 } });
          });
        });
      });
    });

    describe('defining everything on a beforeEach', function() {
      beforeEach(function() {
        this.memorize({
          object: function() {
            return { id: 100 };
          },
          object2: function() {
            return { obj1: this.object() };
          }
        });
      });

      it('returns the inner object in the inner call', function() {
        expect(this.memorized('object2')).toEqual({ obj1: { id: 100 } });
      });

      describe('when overriding inner object', function() {
        describe('in a beforeEach', function() {
          beforeEach(function() {
            this.memorize('object', function() {
              return { id: 101 };
            });
          });

          it('accepts the override', function() {
            expect(this.memorized('object2')).toEqual({ obj1: { id:101 } });
          });
        });

        describe('in a beforeAll', function() {
          beforeAll(function() {
            this.memorize('object', function() {
              return { id: 102 };
            });
          });

          it('does not accept the override', function() {
            expect(this.memorized('object2')).toEqual({ obj1: { id:100 } });
          });
        });
      });
    });

    describe('defining the main object in a beforeEach', function() {
      beforeEach(function() {
        this.memorize('object2', function() {
          return { obj1: this.object() };
        });
      });

      describe('when setting inner object', function() {
        describe('in a beforeEach', function() {
          beforeEach(function() {
            this.memorize('object', function() {
              return { id: 101 };
            });
          });

          it('accepts the value', function() {
            expect(this.memorized('object2')).toEqual({ obj1: { id:101 } });
          });
        });

        describe('in a beforeAll', function() {
          beforeAll(function() {
            this.memorize('object', function() {
              return { id: 102 };
            });
          });

          it('accepts the value', function() {
            expect(this.memorized('object2')).toEqual({ obj1: { id:102 } });
          });
        });
      });
    });

    describe('defining the main object in a beforeAll', function() {
      beforeAll(function() {
        this.memorize('object2', function() {
          return { obj1: this.object() };
        });
      });

      describe('when setting inner object', function() {
        describe('in a beforeEach', function() {
          beforeEach(function() {
            this.memorize('object', function() {
              return { id: 101 };
            });
          });

          it('accepts the value', function() {
            expect(this.memorized('object2')).toEqual({ obj1: { id:101 } });
          });
        });

        describe('in a beforeAll', function() {
          beforeAll(function() {
            this.memorize('object', function() {
              return { id: 102 };
            });
          });

          it('accepts the value', function() {
            expect(this.memorized('object2')).toEqual({ obj1: { id:102 } });
          });
        });
      });
    });
  });
});
