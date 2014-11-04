module Proxy
  class Server
    include MongoMapper::Document

    key :name, String
    key :port, Numeric
    has_one :target, class: ServerProxy::Target
  end
end
