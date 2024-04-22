# frozen_string_literal: true

class VideoForm
  include ActiveModel::Model

  attr_accessor :url, :user_id

  validates :url, presence: true
  validate :user_exists

  def save
    if valid?
      begin
        video_details = `yt-dlp -j #{url}`

        # Parse the JSON output
        video_info = JSON.parse(video_details)

        Video.create(
          title: video_info['title'],
          video_id: video_info['id'],
          description: video_info['description'],
          user_id:
        )
        true
      rescue StandardError
        errors.add(:base, 'Failed to fetch video details, make sure you provided a valid YouTube URL.')
        false
      end
    else
      false
    end
  end

  private

  def user_exists
    errors.add(:user_id, 'does not exist') unless User.exists?(user_id)
  end
end
