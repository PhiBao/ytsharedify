# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string
#  last_name       :string
#  password_digest :string
#  email           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'rails_helper'

RSpec.describe User do
  let(:user) do
    described_class.new(first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', password: 'password')
  end

  describe '#username' do
    it 'returns the full name if present' do
      expect(user.username).to eq('John Doe')
    end

    it 'returns the email if the full name is not present' do
      user.first_name = nil
      user.last_name = nil
      expect(user.username).to eq('john.doe@example.com')
    end
  end

  describe '#downcase_email' do
    it 'converts the email to lower-case' do
      user.email = 'JOHN.DOE@EXAMPLE.COM'
      user.send(:downcase_email)
      expect(user.email).to eq('john.doe@example.com')
    end
  end
end
