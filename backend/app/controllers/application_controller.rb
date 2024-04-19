class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!

  private

  def authenticate_user!
    # Add your authentication logic here
    # Redirect to login page if user is not authenticated
  end
end