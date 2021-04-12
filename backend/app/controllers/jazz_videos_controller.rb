class JazzVideosController < ApplicationController
    def index
        videos = JazzVideo.get(params[:id], request.path.downcase)

        options = {
            include: [:artist]
        }
        render json: JazzVideoSerializer.new(videos, options)
    end

    # actually creates a UserJazzVideo record
    def create
        UserJazzVideo.approve_or_reject(params[:id], params[:vid], params[:approveOrReject])
    end
end