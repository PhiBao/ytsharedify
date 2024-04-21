# frozen_string_literal: true

class Video < ApplicationRecord
  validates :title, presence: true
  validates :url, presence: true,
                  format: { with: %r{\Ahttps?://(?:www\.)?youtube\.com/watch\?v=([A-Za-z0-9_-]+)}i, message: 'Invalid YouTube URL' }
  belongs_to :user

  def embed_url
    youtube_id = url.match(%r{(?:https?://)?(?:www\.)?youtube\.com/watch\?v=([A-Za-z0-9_-]+)}i)[1]
    "https://www.youtube.com/embed/#{youtube_id}"
  end
end
