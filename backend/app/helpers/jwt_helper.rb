# frozen_string_literal: true

module JwtHelper
  def self.secret
    ENV.fetch('SECRET_KEY_BASE', nil)
  end

  def self.encode(payload)
    JWT.encode(payload, secret, 'HS256')
  end

  def self.decode(token)
    JWT.decode(token, secret, true, { algorithm: 'HS256' })[0]
  end
end
