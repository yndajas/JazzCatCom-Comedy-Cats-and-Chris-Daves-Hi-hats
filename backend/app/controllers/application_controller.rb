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

    def render_error_if_user_mismatch
        if params[:id] && params[:id] != current_user.id
            render json: {error: "permission denied"}
        end
    end
end