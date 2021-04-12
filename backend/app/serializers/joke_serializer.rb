class JokeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :external_api_id, :category, :setup, :punchline
end
