class ApplicationController < ActionController::API
    def render_error_if_user_mismatch
        if params[:id]
            user = User.find(params[:id])
            if !user || !(request.headers['token'].try('==', user.token))
                render json: {error: "access denied"}
            end
        end
    end
end