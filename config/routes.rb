Rails.application.routes.draw do

  get '/' => 'home#index', as: :root
  get '/arrange' => 'arrange#index'
  post '/send' => 'arrange#sendFlowers'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
