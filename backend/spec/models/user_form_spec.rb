# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserForm do
  let(:user_params) do
    { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', password: 'password',
      password_confirmation: 'password' }
  end
  let(:user_form) { described_class.new(user_params) }

  describe '#save' do
    it 'returns true if the form is valid' do
      expect(user_form.save).to be true
    end

    it 'returns false if the form is not valid' do
      user_form.email = nil
      expect(user_form.save).to be false
    end
  end

  describe '#email_uniqueness' do
    it 'adds an error if the email is already taken' do
      User.create(user_params)
      user_form.save
      expect(user_form.errors[:email]).to include('has already been taken')
    end
  end
end
