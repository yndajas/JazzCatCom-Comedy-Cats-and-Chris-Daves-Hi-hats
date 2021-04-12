class UserCat < ApplicationRecord
  extend Approvable::ClassMethods

  belongs_to :user
  belongs_to :cat
end
