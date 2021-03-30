class User < ApplicationRecord
    has_many :user_jazz_videos
    has_many :jazz_videos, through: :user_jazz_videos
    has_secure_password

    def approved_jazz_videos
        self.jazz_videos.map do |jazz_video|
            jazz_video if self.user_jazz_videos.find_by(jazz_video_id: jazz_video.id).approved
        end.compact
    end

    def unseen_jazz_videos
        JazzVideo.all.map do |jazz_video|
            jazz_video if !self.user_jazz_videos.find_by(jazz_video_id: jazz_video.id)
        end.compact
    end
end
