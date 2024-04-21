# frozen_string_literal: true

class UserForm
  include ActiveModel::Model

  attr_accessor :first_name, :last_name, :email, :password, :password_confirmation

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }
  validates :first_name, :last_name, :password, presence: true
  validates :password, confirmation: true
  validate :email_uniqueness

  def save
    if valid?
      @user = User.create(first_name:, last_name:, email:, password:)
      true
    else
      false
    end
  end

  attr_reader :user

  private

  def email_uniqueness
    errors.add(:email, 'has already been taken') if User.exists?(email:)
  end
end
