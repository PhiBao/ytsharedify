# frozen_string_literal: true

class UserBlueprint < Blueprinter::Base
  identifier :id

  view :full do
    fields :first_name, :last_name, :email, :created_at
  end

  view :short do
    field :username
  end
end
