Rails.application.routes.draw do
  post 'sessions' => 'sessions#create'

  post 'users' => 'users#create'

  get 'jazz-videos' => 'jazz_videos#index'
  get 'users/:id/jazz-videos' => 'jazz_videos#index'
  get 'users/:id/jazz-videos/unseen' => 'jazz_videos#index'
  post 'users/:id/jazz-videos' => 'jazz_videos#create'

  get 'users/:id/cats' => 'cats#index'
  post 'users/:id/cats' => 'cats#create'

  get 'users/:id/jokes' => 'jokes#index'
  post 'users/:id/jokes' => 'jokes#create'
end