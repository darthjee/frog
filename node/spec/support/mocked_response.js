class MockResponse {
  writeHead(status, headers) {
    this.status = status;
    this.headers = headers;
  }

  on() {
  }

  once() {
  }

  emit() {
  }

  end() {
  }

  write(data) {
    this.data = data.toString();
  }
}

module.exports = MockResponse;
