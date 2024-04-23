# frozen_string_literal: true

class SessionsController < ApplicationController
  before_action :load_user_by_email, only: :create

  def create
    if @user&.authenticate(session_params[:password])
      payload = { id: @user.id, username: @user.username }
      token = JwtHelper.encode(payload)
      render json: { token:, user: UserBlueprint.render_as_hash(@user, view: :full),
                     remember_me: session_params[:remember_me] }, status: :ok
    else
      render json: { messages: ['Invalid password'] }, status: :bad_request
    end
  end

  private

  def session_params
    params.require(:user).permit(:email, :password, :remember_me)
  end
end
