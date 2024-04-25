# frozen_string_literal: true

class ApplicationController < ActionController::API
  include JwtHelper

  def load_user_by_email
    email = params.dig(:user, :email)
    if email.blank?
      response_json_msg('The email address is not present', :not_found)
    else
      @user = User.find_by!(email: email.downcase)
    end
  rescue ActiveRecord::RecordNotFound
    response_json_msg('The email address is not found. Please type another one', :not_found)
  end

  def current_user
    token = request.headers['Authentication-Token']
    return if token.blank? || token == 'undefined'

    User.find(JwtHelper.decode(token)['id'])
  rescue JWT::DecodeError # rubocop:todo Lint/SuppressedException
  end

  def logged_in_user
    return if current_user.present?

    response_json_msg('You need to login', :forbidden)
  end

  def response_json_msg(message, status)
    render json: { messages: [message] }, status:
  end
end
