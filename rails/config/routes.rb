Frog::Application.routes.draw do
  resources :proxy, :except => [:delete] do
  end
end
