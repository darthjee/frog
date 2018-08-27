class Memorized {
  constructor(func) {
    this.func = func;
    this.value = null;
    this.called = false;
  }

  reset() {
    this.value = null;
    this.called = false;
  }

  call(context) {
    if (!this.called) {
      this.value = this.func.call(context);
      this.called = true;
    }
    return this.value;
  }
}

module.exports = Memorized;
