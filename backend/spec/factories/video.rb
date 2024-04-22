# frozen_string_literal: true

FactoryBot.define do
  factory :video do
    title { 'Welcome to Ytsharedifly' }
    video_id { 'ytsharedifly' }
    description { 'Contact: support@ytsharedifly.com' }
    user
  end
end
