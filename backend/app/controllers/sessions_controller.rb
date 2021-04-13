class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user.try(:authenticate, params[:password])
        render json: {user: {id: user.id, email: user.email, token: user.token}}
    else
      render json: {error: "Incorrect email and/or password"}, status: 401
    end
  end
end
