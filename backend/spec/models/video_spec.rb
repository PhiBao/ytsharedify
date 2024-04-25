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
require 'rails_helper'

RSpec.describe Video do
  let(:video) { create(:video, video_id: Settings.rspec.default_video_id) }

  describe '#embed_url' do
    it 'returns the correct embed URL' do
      expect(video.embed_url).to eq("https://www.youtube.com/embed/#{Settings.rspec.default_video_id}")
    end
  end
end
