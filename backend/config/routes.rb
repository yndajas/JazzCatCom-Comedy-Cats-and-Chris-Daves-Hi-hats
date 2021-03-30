Rails.application.routes.draw do
  resources :users
  get '/jazz-videos' => 'jazz_videos#index'
  get '/users/:id/jazz-videos' => 'jazz_videos#index'
  get '/users/:id/jazz-videos/unseen' => 'jazz_videos#index'
end