class CatsController < ApplicationController
    before_action :render_error_if_user_mismatch
    
    def index
        cats = Cat.get(params[:id], request.path.downcase)
        render json: CatSerializer.new(cats)
    end

    # actually creates a UserCat record
    def create
        UserCat.approve_or_reject(params[:id], params[:identifier], params[:approveOrReject])
    end
end
