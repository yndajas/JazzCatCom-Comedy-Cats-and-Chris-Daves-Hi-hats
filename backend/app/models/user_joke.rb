class UserJoke < ApplicationRecord
  extend Approvable::ClassMethods

  belongs_to :user
  belongs_to :joke
end
