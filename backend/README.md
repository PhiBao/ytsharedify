# Backend

This directory contains the backend API for the project. It is built using Ruby on Rails (RoR) framework.

## Controllers

### `application_controller.rb`

This file is the base controller for the Rails application. It provides common functionality and is inherited by other controllers.

### `sessions_controller.rb`

This file contains the controller for handling user sessions, including login and logout functionality.

### `videos_controller.rb`

This file contains the controller for managing videos, including sharing and listing videos.

## Models

### `user.rb`

This file contains the model for the User entity. It defines the attributes and associations for the User model.

### `video.rb`

This file contains the model for the Video entity. It defines the attributes and associations for the Video model.

## Views

This directory contains the views for the Rails application.

# Frontend

This directory contains the frontend of the project. It is built using TypeScript and ReactJS.

## Components

### `Login.tsx`

This file contains the component for the login functionality. It handles user authentication and login.

### `Register.tsx`

This file contains the component for the registration functionality. It handles user registration.

### `VideoList.tsx`

This file contains the component for displaying the list of shared videos. It fetches the videos from the backend API and renders them.

### `VideoShare.tsx`

This file contains the component for sharing a YouTube video. It allows users to enter the YouTube video URL and submit it to be shared.

## Other Files

- `App.tsx`: This file is the main component of the React application. It sets up the routes and renders the different components based on the current route.
- `index.tsx`: This file is the entry point of the React application. It renders the `App` component into the DOM.
- `types/index.ts`: This file exports interfaces for TypeScript types used in the frontend application.

Please refer to the individual files for more details on their implementation.
