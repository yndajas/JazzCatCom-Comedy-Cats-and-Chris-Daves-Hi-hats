class UserJazzVideo < ApplicationRecord
  belongs_to :user
  belongs_to :jazz_video

  def self.approve_or_reject(user_id, jazz_video_id, approve_or_reject)
    approved = (approve_or_reject == 'approve') ? true : false
    user_jazz_video = UserJazzVideo.find_or_create_by(user_id: user_id, jazz_video_id: jazz_video_id)
    user_jazz_video.update(approved: approved)
  end
end
