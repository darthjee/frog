module Proxy
  class Target
    include Mongoid::Document

    field :host, type: String
    field :port, type: Numeric
  end
end
