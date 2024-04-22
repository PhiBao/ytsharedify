# frozen_string_literal: true

class VideosController < ApplicationController
  before_action :logged_in_user, except: :index

  def index
    page = params[:page] || 1
    list = Video.includes(:user).newest

    render json: VideoBlueprint.render(list.page(page), root: :list, view: :normal, meta: { total: list.length })
  end

  def create
    VideoDetailsJob.perform_later(video_params[:url], current_user.id)

    response_json_msg('Video shared, details are being fetched.', :created)
  end

  private

  def video_params
    params.require(:video).permit(:url)
  end
end
