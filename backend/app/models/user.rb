# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string
#  last_name       :string
#  password_digest :string
#  email           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password
  has_many :videos # rubocop:todo Rails/HasManyOrHasOneDependent
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
