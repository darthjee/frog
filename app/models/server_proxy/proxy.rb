module ServerProxy
  class Proxy
    include MongoMapper::EmbeddedDocument
    key :host, String
    key :port, Numeric
  end
end