class Request
  include Mongoid::Document

  field :host,    type: String
  field :port,    type: Numeric
  field :path,    type: String
  field :body,    type: Hash
  field :headers, type: Hash

  def call
    requester.call
  end

  private

  def requester
    @requester ||= Requester.new(
      "http://#{host}:#{port}",
      path,
      body: body,
      headers: headers
    )
  end
end
