Rails.application.routes.draw do
  root :to => "web/boards#show"

  namespace :admin do
    resources :users, only: %i[index show new create edit update destroy]
  end

  scope module: :web do
    resource :board, only: :show
    resource :session, only: %i[new create destroy]

    resources :developers, only: %i[new create]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
