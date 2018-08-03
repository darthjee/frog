class Requester
  def initialize(url, path, method: :get, headers: {}, body: {})
    @url = url
    @path = path
    @method = method
    @headers = headers
    @body = body
  end

  def call
    case method
    when :get
      get
    when :post
      post
    end
  end

  private

  attr_reader :url, :path, :method, :headers, :body

  def get
    connector.get(path)
  end

  def post
    connector.post(path) do |req|
      req.body = body
    end
  end

  def connector
    @connector ||= build_connector
  end

  def build_connector
    Faraday.new(url: url) do |faraday|
      faraday.request :url_encoded
      faraday.adapter Faraday.default_adapter

      headers&.each do |key, value|
        faraday.headers[key] = value
      end
    end
  end
end
