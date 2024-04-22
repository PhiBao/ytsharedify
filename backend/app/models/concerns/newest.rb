# frozen_string_literal: true

module Newest
  extend ActiveSupport::Concern

  included do
    scope :newest, -> { order('created_at desc') }
  end
end
