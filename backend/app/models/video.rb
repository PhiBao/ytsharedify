# frozen_string_literal: true

# == Schema Information
#
# Table name: videos
#
#  id          :bigint           not null, primary key
#  user_id     :bigint           not null
#  title       :string
#  video_id    :string
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
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
