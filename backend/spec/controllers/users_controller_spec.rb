# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UsersController do
  render_views

  describe 'POST #create' do
    context 'with valid parameters' do
      let(:valid_params) do
        {
          user: {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@ytsharedify.com',
            password: 'password',
            password_confirmation: 'password'
          }
        }
      end

      it 'creates a new user' do
        expect do
          post :create, params: valid_params
        end.to change(User, :count).by(1)
      end

      it 'returns a token and the user' do # rubocop:todo RSpec/MultipleExpectations
        post :create, params: valid_params
        json = response.parsed_body
        expect(json['token']).not_to be_nil
        expect(json['user']).not_to be_nil
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid parameters' do
      let(:invalid_params) do
        {
          user: {
            first_name: '',
            last_name: '',
            email: 'john.doe@ytsharedify.com',
            password: 'password',
            password_confirmation: 'password'
          }
        }
      end

      it 'does not create a new user' do
        expect do
          post :create, params: invalid_params
        end.not_to change(User, :count)
      end

      it 'returns an error message' do # rubocop:todo RSpec/MultipleExpectations
        post :create, params: invalid_params
        json = response.parsed_body
        expect(json['messages']).to include("First name can't be blank")
        expect(json['messages']).to include("Last name can't be blank")
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
