# frozen_string_literal: true

class VideoBlueprint < Blueprinter::Base
  identifier :id
  fields :title, :description, :created_at
  field :embed_url

  view :normal do
    association :user, blueprint: UserBlueprint, view: :short
  end
end
