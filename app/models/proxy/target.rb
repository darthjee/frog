module Proxy
  class Target
    include MongoMapper::EmbeddedDocument

    key :host, String
    key :port, Numeric
  end
end
