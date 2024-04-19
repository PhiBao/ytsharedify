# Frontend

This directory contains the frontend code for the project. It is built using React and TypeScript.

## Project Structure

The frontend directory has the following structure:

```
frontend
├── public
├── src
│   ├── components
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── VideoList.tsx
│   │   └── VideoShare.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

- `public`: This directory contains the public assets for the React application.
- `src`: This directory contains the source code for the React application.
  - `components`: This directory contains the different components used in the application.
    - `Login.tsx`: This file contains the component for the login functionality. It handles user authentication and login.
    - `Register.tsx`: This file contains the component for the registration functionality. It handles user registration.
    - `VideoList.tsx`: This file contains the component for displaying the list of shared videos. It fetches the videos from the backend API and renders them.
    - `VideoShare.tsx`: This file contains the component for sharing a YouTube video. It allows users to enter the YouTube video URL and submit it to be shared.
  - `App.tsx`: This file is the main component of the React application. It sets up the routes and renders the different components based on the current route.
  - `index.tsx`: This file is the entry point of the React application. It renders the `App` component into the DOM.
  - `types/index.ts`: This file exports interfaces for TypeScript types used in the frontend application.
- `package.json`: This file is the configuration file for npm. It lists the dependencies and scripts for the frontend application.
- `tsconfig.json`: This file is the configuration file for TypeScript. It specifies the compiler options and the files to include in the compilation.
- `README.md`: This file contains the documentation for the frontend application.

## Getting Started

To run the frontend application, follow these steps:

1. Install the dependencies by running `npm install` in the frontend directory.
2. Start the development server by running `npm start`.
3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Available Scripts

In the frontend directory, you can run the following scripts:

- `npm start`: Starts the development server.
- `npm test`: Runs the test suite.
- `npm run build`: Builds the production-ready optimized bundle.

## Dependencies

The frontend application has the following dependencies:

- React: A JavaScript library for building user interfaces.
- React Router: A routing library for React applications.
- Axios: A promise-based HTTP client for making API requests.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.

Please refer to the `package.json` file for the complete list of dependencies and their versions.

## Contributing

If you would like to contribute to the frontend application, please follow the guidelines in the [CONTRIBUTING.md](link-to-contributing.md) file.

## License

This project is licensed under the [MIT License](link-to-license.md).