class UsersController < ApplicationController
    def create
        if User.find_by(email: params[:email])
            # error - user exists
        else
            user = User.create(email: params[:email], password: params[:password])
            session[:user_id] = user.id
            render json: {user: user.email}
        end        
    end
end