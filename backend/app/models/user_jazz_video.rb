class UserJazzVideo < ApplicationRecord
  extend Approvable::ClassMethods

  belongs_to :user
  belongs_to :jazz_video
end
