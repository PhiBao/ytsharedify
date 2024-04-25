# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Videos' do
  let(:user) { create(:user) }
  let(:valid_url) { "https://www.youtube.com/watch?v=#{Settings.rspec.default_video_id}" }
  let(:invalid_url) { 'invalid_url' }

  describe 'GET /videos' do
    before { get '/videos' }

    it 'returns a success status' do
      expect(response).to have_http_status(:ok)
    end

    it 'returns a list of videos' do
      expect(JSON.parse(response.body)['list']).to be_an(Array)
    end
  end

  describe 'POST /videos' do
    context 'when user is logged in' do
      before do
        # rubocop:todo RSpec/AnyInstance
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
        # rubocop:enable RSpec/AnyInstance
        post '/videos', params: { video: { url: valid_url } }
      end

      it 'returns a created status' do
        expect(response).to have_http_status(:created)
      end

      it 'returns a success message' do
        json = response.parsed_body
        expect(json['messages']).to include('Video shared, details are being fetched.')
      end
    end

    context 'when user is not logged in' do
      before { post '/videos', params: { video: { url: valid_url } } }

      it 'returns an unauthorized status' do
        expect(response).to have_http_status(:forbidden)
      end
    end
  end
end
