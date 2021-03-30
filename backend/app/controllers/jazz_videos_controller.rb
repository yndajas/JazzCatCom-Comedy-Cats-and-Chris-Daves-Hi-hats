class JazzVideosController < ApplicationController
    def index
        videos = JazzVideo.all
        options = {
            include: [:artist]
        }
        render json: JazzVideoSerializer.new(videos, options)
    end
end
