class ProxyController < ApplicationController
  def new
    @server = Proxy::Server.new
    @server.target = Proxy::Target.new
  end

  def show
  end

  def edit
  end

  def update
  end
end