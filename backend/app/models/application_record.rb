# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  include Newest
  primary_abstract_class
end
