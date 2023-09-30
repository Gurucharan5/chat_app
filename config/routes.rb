Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    namespace :v1 do
      #code here
      post 'users/signup', to: 'user#create_user'
      post 'users/image' , to: 'user#image'
    end
  end
end
