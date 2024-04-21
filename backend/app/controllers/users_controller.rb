# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    user_form = UserForm.new(user_params)

    if user_form.save
      payload = { id: user_form.user.id }
      token = JwtHelper.encode(payload)
      render json: { user: UserBlueprint.render_as_hash(user_form.user, view: :full),
                     token: }, status: :created
    else
      render json: { messages: user_form.errors.full_messages }, status: :not_found
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end
end
