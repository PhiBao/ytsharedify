# frozen_string_literal: true

class NotificationRelayJob < ApplicationJob
  queue_as :default

  def perform(video)
    ActionCable.server.broadcast('notifications_channel',
                                 {
                                   notification: VideoBlueprint.render_as_hash(video, view: :normal)
                                 })
  end
end
