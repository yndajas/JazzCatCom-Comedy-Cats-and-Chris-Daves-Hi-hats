class JokeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :external_api_id, :type, :setup, :punchline
end
