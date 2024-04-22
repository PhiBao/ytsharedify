# frozen_string_literal: true

class Video < ApplicationRecord
  paginates_per Settings.per_page.videos
  belongs_to :user

  def embed_url
    "https://www.youtube.com/embed/#{video_id}"
  end
end
