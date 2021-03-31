class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user.try(:authenticate, params[:password])
        session[:user_id] = user.id
        render json: {user: user.email}
    else
      # error
    end
  end

  def destroy
    session.delete :user_id
  end
end
