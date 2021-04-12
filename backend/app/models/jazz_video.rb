class JazzVideo < ApplicationRecord
    extend Gettable::ClassMethods

    belongs_to :artist
    has_many :user_jazz_videos
    has_many :users, through: :user_jazz_videos
    
    def self.identifier
        "vid"
    end
end
