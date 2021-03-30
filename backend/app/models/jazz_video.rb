class JazzVideo < ApplicationRecord
    belongs_to :artist
    has_many :user_jazz_videos
    has_many :users, through: :user_jazz_videos

    def self.get(user_id, request_path)
        if user_id
            user = User.find(user_id)
            if request_path.gsub(/.*\//,"") == "unseen"
                user.unseen_jazz_videos
            else
                user.approved_jazz_videos
            end
        else
            self.all
        end
    end

end
