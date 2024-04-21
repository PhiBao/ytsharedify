# frozen_string_literal: true

# spec/controllers/sessions_controller_spec.rb

require 'rails_helper'

RSpec.describe SessionsController do
  render_views
  let(:user) { create(:user, password: 'password') }

  describe 'POST #create' do
    context 'with valid credentials' do
      it 'returns a token and the user' do
        post :create, params: { user: { email: user.email, password: 'password', remember_me: true } }
        json = response.parsed_body
        expect(json['token']).not_to be_nil
        expect(json['user']).not_to be_nil
        expect(ActiveRecord::Type::Boolean.new.cast(json['remember_me'])).to be true
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid credentials' do
      it 'returns an error message' do
        post :create, params: { user: { email: user.email, password: 'wrong password', remember_me: true } }
        json = response.parsed_body
        expect(json['messages']).to include('Invalid password')
        expect(response).to have_http_status(:bad_request)
      end
    end
  end
end
