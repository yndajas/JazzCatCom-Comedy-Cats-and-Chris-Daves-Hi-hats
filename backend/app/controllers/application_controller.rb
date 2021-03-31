class ApplicationController < ActionController::API
    # enable sessions
    include ActionController::Cookies
    include ActionController::RequestForgeryProtection
  
    def logged_in?
        !!session[:user_id]
    end

    def current_user
        @current_user ||= User.find(session[:user_id])
    end
end