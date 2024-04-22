# frozen_string_literal: true

class VideoDetailsJob < ApplicationJob
  queue_as :default

  def perform(url, user_id)
    video_form = VideoForm.new(
      url:,
      user_id:
    )

    video_form.save
  end
end
