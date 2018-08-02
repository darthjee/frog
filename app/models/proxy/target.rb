module Proxy
  class Target
    include Mongoid::Documet

    field :host, type: String
    field :port, type: Numeric
  end
end
