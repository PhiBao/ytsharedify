# This file is the Rackup file for the Rails application.
# It is used to start the application server and configure the middleware stack.

require_relative 'config/environment'

use Rack::MethodOverride
use ActionDispatch::Cookies
use ActionDispatch::Session::CookieStore
use ActionDispatch::Flash

run Rails.application