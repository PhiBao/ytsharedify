# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users' do
  describe 'POST /users' do
    let(:valid_params) do
      {
        user: {
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          password: 'password',
          password_confirmation: 'password'
        }
      }
    end

    context 'when the request is valid' do
      before { post '/users', params: valid_params }

      it 'creates a user' do # rubocop:todo RSpec/MultipleExpectations
        expect(response).to have_http_status(:created)
        expect(JSON.parse(response.body)['user']).not_to be_nil
        expect(JSON.parse(response.body)['token']).not_to be_nil
      end
    end

    context 'when the request is invalid' do
      before { post '/users', params: { user: { first_name: 'John' } } }

      it 'returns a not found status' do
        expect(response).to have_http_status(:not_found)
      end

      it 'returns error messages' do
        expect(JSON.parse(response.body)['messages']).not_to be_empty
      end
    end
  end
end
