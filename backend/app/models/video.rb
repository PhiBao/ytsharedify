# frozen_string_literal: true

class Video < ApplicationRecord
  paginates_per Settings.per_page.videos
  belongs_to :user

  after_create :send_notification

  def embed_url
    "https://www.youtube.com/embed/#{video_id}"
  end

  def send_notification
    NotificationRelayJob.perform_now(self)
  end
end
