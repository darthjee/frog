module ServerProxy
  class Server
    include MongoMapper::Document

    key :name, String
    key :port, Number
    has_one :proxy
  end

  class Proxy
    include MongoMapper::EmbeddedDocument
    key :host, String
    key :port, Number
  end
end