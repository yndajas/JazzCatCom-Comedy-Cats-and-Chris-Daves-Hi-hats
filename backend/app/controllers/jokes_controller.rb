class JokesController < ApplicationController
    before_action :render_error_if_user_mismatch

    def index
        jokes = Joke.get(params[:id], request.path.downcase)
        render json: JokeSerializer.new(jokes)
    end

    # actually creates a UserJoke record
    def create
        UserJoke.approve_or_reject(params[:id], params[:identifier], params[:approveOrReject], params[:additional_attributes])
    end
end
