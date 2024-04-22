# frozen_string_literal: true

require 'rails_helper'

RSpec.describe VideosController do
  render_views
  let(:user) { create(:user) }
  let(:video) { create(:video, user:) }

  describe 'GET #index' do
    before do
      get :index
    end

    it 'returns a success response' do
      expect(response).to have_http_status(:success)
    end

    it 'returns a list of videos' do
      expect(response.parsed_body['list']).to be_an(Array)
    end
  end

  describe 'POST #create' do
    context 'when user is logged in' do
      before do
        allow(controller).to receive(:current_user).and_return(user)
        post :create, params: { video: { url: "https://www.youtube.com/watch?v=#{Settings.rspec.default_video_id}" } }
      end

      it 'returns a created response' do
        expect(response).to have_http_status(:created)
      end

      it 'returns a success message' do
        json = response.parsed_body
        expect(json['messages']).to include('Video shared, details are being fetched.')
      end
    end

    context 'when user is not logged in' do
      before do
        post :create, params: { video: { url: "https://www.youtube.com/watch?v=#{Settings.rspec.default_video_id}" } }
      end

      it 'returns an unauthorized response' do
        expect(response).to have_http_status(:forbidden)
      end
    end
  end
end
