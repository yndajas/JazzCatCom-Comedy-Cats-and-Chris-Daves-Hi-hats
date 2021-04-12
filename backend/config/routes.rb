Rails.application.routes.draw do
  post 'sessions' => 'sessions#create'
  delete 'sessions' => 'sessions#destroy'

  post 'users' => 'users#create'

  get 'jazz-videos' => 'jazz_videos#index'
  get 'users/:id/jazz-videos' => 'jazz_videos#index'
  get 'users/:id/jazz-videos/unseen' => 'jazz_videos#index'
  post 'users/:id/jazz-videos' => 'jazz_videos#create'

  get 'users/:id/cats' => 'cats#index'
  get 'users/:id/cats/random' => 'cats#index'
  post 'users/:id/cats' => 'cats#create'
end