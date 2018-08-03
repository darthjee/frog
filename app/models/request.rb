class Request
  include Mongoid::Document

  field :host, type: String
  field :port, type: Numeric
  field :path, type: String
  field :body, type: Hash
end
