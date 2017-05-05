Rails.application.routes.draw do
  get 'home/index'
  get 'test', to: 'home#test'

  resources :proxy, only: [] do
    get :cryptocompare_list, on: :collection
    get :cryptocompare_price, on: :collection
  end

  root to: 'home#index'
end
