## Introduction

Ytsharedify project is a full-stack web application that allows users to share and view videos. The backend is built with Ruby on Rails, and the frontend is built with React and TypeScript. Key features include user authentication, video sharing, and a real-time video list.

## Prerequisites

- Ruby 3.3.0
- Node.js 20
- PostgreSQL 13
- Redis 6.2
- Docker (optional)

## Installation & Configuration

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Copy the sample environment files for the backend and frontend:
   `cp backend/.env.sample.erb backend/.env` and `cp frontend/.env.sample frontend/.env`
   - Please review these `.env` files and update the variables as necessary.
4. Install backend dependencies: `cd backend && bundle install`
5. Install frontend dependencies: `cd ../frontend && npm install --legacy-peer-deps`
6. Install `yt-dlp`:

```
sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp
```

7. Configure Sidekiq:
   - Ensure Redis is installed and running: `redis-server`
   - Start Sidekiq from the backend directory: `bundle exec sidekiq`

## Database Setup

1. Navigate to the backend directory: `cd backend`
2. Create the database and run migrations: `bundle exec rails db:create db:migrate`
3. (Optional) Seed the database: `bundle exec rails db:seed`

## Running the Application

1. Start the Rails server: In the backend directory `bundle exec rails server -p 8080`
2. In a new terminal, navigate to the frontend directory: `cd frontend`
3. Start the React development server: `npm start`
4. Access the application in your web browser at `http://localhost:3000`
5. Run the test suite: `bundle exec rspec` (backend) and `npm test` (frontend)

## Docker Deployment (optional)

1. Build the Docker images: `docker-compose build`
2. Run the Docker containers: `docker-compose up`
3. Access the application in your web browser at `http://localhost:3001`

## Usage

After starting the application, you can register a new account or log in. Once authenticated, you can share videos by providing a URL and view a list of shared videos.

## Troubleshooting

- If you encounter issues with database setup, ensure that PostgreSQL is running and that the `DB_HOST`, `DB_USER`, and `DB_PASSWORD` environment variables are correctly set in your `.env` file.
- If the Rails server fails to start, check the [`backend/log/development.log`] file for potential errors.
- If the React development server fails to start, ensure that Node.js is correctly installed and that the `REACT_APP_API_URL`, `REACT_APP_TOKEN_KEY`, and `REACT_APP_CABLE_ENDPOINT` environment variables are correctly set in your `.env` file.
