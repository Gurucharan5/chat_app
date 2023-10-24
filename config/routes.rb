Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  
  # root "articles#index"
  namespace :api do
    namespace :v1 do
      mount ActionCable.server => "/cable"
      #code here
      post 'users/signup', to: 'user#create_user'
      post 'users/login' , to: 'user#login'
      post 'users/image' , to: 'profile#image'
      post 'users/doxapi', to: 'profile#doxapi'
      post 'posts/create' , to: 'posts#create'
      get 'posts/getpost' , to: 'posts#getpost'
      post 'profile/getimage' , to: 'profile#getimage'
    end
  end
end
