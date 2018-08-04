module Proxy
  class Server
    include Mongoid::Document
    field :name, type: String
    field :port, type: Numeric
  end
end
