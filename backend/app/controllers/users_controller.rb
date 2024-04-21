# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    user = User.new(user_params)

    if user.save
      payload = { id: user.id }
      token = JwtHelper.encode(payload)
      render json: { user: UserBlueprint.render_as_hash(user, view: :full),
                     token: }, status: :created
    else
      render json: { messages: user.errors.full_messages }, status: :not_found
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end
end
