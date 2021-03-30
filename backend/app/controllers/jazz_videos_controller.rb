class JazzVideosController < ApplicationController
    def index
        videos = JazzVideo.get(params[:id], request.path.downcase)

        options = {
            include: [:artist]
        }
        render json: JazzVideoSerializer.new(videos, options)
    end
end