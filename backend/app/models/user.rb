class User < ApplicationRecord
  has_many :videos

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }

  # Additional user methods can be defined here
end