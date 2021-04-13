class UsersController < ApplicationController
    def create
        if User.find_by(email: params[:email])
            render json: {error: "User already exists", status: 401}
        else
            user = User.create(email: params[:email], password: params[:password], token: SecureRandom.urlsafe_base64)
            render json: {user: {id: user.id, email: user.email, token: user.token}}
        end        
    end
end