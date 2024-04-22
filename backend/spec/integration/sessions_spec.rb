# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Sessions' do
  let(:user) { create(:user, password: 'password') }
  let(:valid_params) { { user: { email: user.email, password: 'password', remember_me: true } } }
  let(:invalid_params) { { user: { email: user.email, password: 'wrong_password', remember_me: true } } }

  describe 'POST /sessions' do
    context 'when the request is valid' do
      before { post '/sessions', params: valid_params }

      it 'returns a success status' do
        expect(response).to have_http_status(:ok)
      end

      it 'returns a JWT token' do
        expect(JSON.parse(response.body)['token']).not_to be_nil
      end

      it 'returns the user' do
        expect(JSON.parse(response.body)['user']).not_to be_nil
      end

      it 'returns the remember_me value' do
        expect(ActiveRecord::Type::Boolean.new.cast(JSON.parse(response.body)['remember_me'])).to be(true)
      end
    end

    context 'when the request is invalid' do
      before { post '/sessions', params: invalid_params }

      it 'returns a bad request status' do
        expect(response).to have_http_status(:bad_request)
      end

      it 'returns an error message' do
        expect(JSON.parse(response.body)['messages']).to include('Invalid password')
      end
    end
  end
end
