class User < ApplicationRecord
    has_many :user_jazz_videos
    has_many :user_cats
    has_many :jazz_videos, through: :user_jazz_videos
    has_many :cats, through: :user_cats
    has_secure_password

    def approved(resource)
        self.send(resource).map do |instance|
            instance if self.send("user_#{resource}").find_by(:"#{resource.singularize}_id" => instance.id).approved
        end.compact
    end


    def unseen(resource)
        cclass = resource.classify.constantize
        cclass.all.map do |instance|
            instance if !self.send("user_#{resource}").find_by(:"#{resource.singularize}_id" => instance.id)
        end.compact
    end
end
