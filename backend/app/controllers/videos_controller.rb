# frozen_string_literal: true

class VideosController < ApplicationController
  before_action :authenticate_user!

  def index
    @videos = Video.all
    render json: @videos
  end

  def create
    @video = Video.new(video_params)
    if @video.save
      render json: @video, status: :created
    else
      render json: { errors: @video.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def video_params
    params.require(:video).permit(:title, :url)
  end
end
