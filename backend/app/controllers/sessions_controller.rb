class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user.try(:authenticate, params[:password])
        session[:user_id] = user.id
        render json: {user: {id: user.id, email: user.email}}
    else
      render json: {error: "Incorrect email and/or password"}, status: 401
    end
  end

  def destroy
    session.delete :user_id
  end
end
