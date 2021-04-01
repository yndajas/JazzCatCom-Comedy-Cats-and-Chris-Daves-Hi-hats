Rails.application.routes.draw do
  post 'sessions' => 'sessions#create'
  delete 'sessions' => 'sessions#destroy'
  post 'users' => 'users#create'
  # resources :users
  get '/jazz-videos' => 'jazz_videos#index'
  get '/users/:id/jazz-videos' => 'jazz_videos#index'
  get '/users/:id/jazz-videos/unseen' => 'jazz_videos#index'
end