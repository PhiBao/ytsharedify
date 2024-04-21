# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  has_many :videos
  before_save :downcase_email

  validates :email, presence: true, uniqueness: true, format: VALID_EMAIL_REGEX

  def self.digest(string)
    cost = if ActiveModel::SecurePassword.min_cost
             BCrypt::Engine::MIN_COST
           else
             BCrypt::Engine.cost
           end
    BCrypt::Password.create(string, cost:)
  end

  # Returns a random token.
  def self.new_token
    SecureRandom.urlsafe_base64
  end

  def username
    full_name = "#{first_name || ''} #{last_name || ''}"
    full_name.presence || email
  end

  # Returns true if the given token matches the digest.
  def authenticated?(attribute, token)
    digest = send("#{attribute}_digest")
    return false if digest.nil?

    BCrypt::Password.new(digest).is_password?(token)
  end

  private

  # Converts email to all lower-case.
  def downcase_email
    email.downcase!
  end
end
