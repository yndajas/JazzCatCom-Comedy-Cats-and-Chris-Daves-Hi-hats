class Joke < ApplicationRecord
    extend Gettable::ClassMethods

    has_many :user_jokes
    has_many :users, through: :user_jokes

    def self.identifier
        "external_api_id"
    end
end
