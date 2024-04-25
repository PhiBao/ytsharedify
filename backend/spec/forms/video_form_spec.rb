# frozen_string_literal: true

require 'rails_helper'

RSpec.describe VideoForm, type: :model do
  let(:user) { create(:user) }
  let(:valid_url) { "https://www.youtube.com/watch?v=#{Settings.rspec.default_video_id}" }
  let(:invalid_url) { 'invalid_url' }

  describe '#save' do
    context 'when url is valid' do
      subject { described_class.new(url: valid_url, user_id: user.id) }

      it 'returns true' do
        expect(subject.save).to be true # rubocop:todo RSpec/NamedSubject
      end

      it 'creates a new video' do
        expect { subject.save }.to change(Video, :count).by(1) # rubocop:todo RSpec/NamedSubject
      end
    end

    context 'when url is invalid' do
      subject { described_class.new(url: invalid_url, user_id: user.id) }

      it 'returns false' do
        expect(subject.save).to be false # rubocop:todo RSpec/NamedSubject
      end

      it 'does not create a new video' do
        expect { subject.save }.not_to(change(Video, :count)) # rubocop:todo RSpec/NamedSubject
      end

      it 'adds an error message' do
        subject.save # rubocop:todo RSpec/NamedSubject
        # rubocop:todo RSpec/NamedSubject
        # rubocop:todo Layout/LineLength
        expect(subject.errors.full_messages).to include('Failed to fetch video details, make sure you provided a valid YouTube URL.')
        # rubocop:enable Layout/LineLength
        # rubocop:enable RSpec/NamedSubject
      end
    end

    context 'when user does not exist' do
      subject { described_class.new(url: valid_url, user_id: -1) }

      it 'returns false' do
        expect(subject.save).to be false # rubocop:todo RSpec/NamedSubject
      end

      it 'does not create a new video' do
        expect { subject.save }.not_to(change(Video, :count)) # rubocop:todo RSpec/NamedSubject
      end

      it 'adds an error message' do
        subject.save # rubocop:todo RSpec/NamedSubject
        expect(subject.errors.full_messages).to include('User does not exist') # rubocop:todo RSpec/NamedSubject
      end
    end
  end
end
