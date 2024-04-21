# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { 'bot@ytsharedify.com' }
    password { 'password' }
    first_name { 'John' }
    last_name { 'Doe' }
  end
end
