# backend/Dockerfile

# Base image
FROM ruby:3.3.0

# Set environment variables
ENV APP_HOME /app
ENV BUNDLE_PATH /bundle

# Create and set the working directory
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# Install dependencies
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
RUN chmod a+rx /usr/local/bin/yt-dlp

# Copy the Gemfile and Gemfile.lock
COPY Gemfile* $APP_HOME/

# Install gems
RUN bundle install

# Copy the application code
COPY . $APP_HOME

# Expose the port
EXPOSE 3000

# Start the server
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
