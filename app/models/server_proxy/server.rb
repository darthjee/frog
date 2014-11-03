module ServerProxy
  class Server
    include MongoMapper::Document

    key :name, String
    key :port, Numeric
    has_one :proxy, class: ServerProxy::Proxy
  end
end