require 'spec_helper'

describe ProxyController do
  describe '#show' do
    before do
      get :new
    end
    
    it { expect(:controller).to assign(:server) }
  end
end