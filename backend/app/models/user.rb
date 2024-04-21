# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  has_many :videos
  before_save :downcase_email

  def username
    full_name = "#{first_name || ''} #{last_name || ''}"
    full_name.presence || email
  end

  private

  # Converts email to all lower-case.
  def downcase_email
    email.downcase!
  end
end
