# DelBicosV2

## Project Structure

```
DelBicosV2
├── src
│   ├── assets          # Static assets like images and fonts
│   ├── components      # Reusable React components
│   ├── config          # Configuration files for the application
│   ├── lib
│   │  ├── constants    # Constants used throughout the application
│   │  ├── helpers      # Helper functions and utilities
│   │  └── hooks        # Custom React hooks
│   │
│   ├── screens         # Main screens of the application and navigation
│   │  ├── private      # Private screens requiring authentication
│   │  └── public       # Public screens accessible unauthenticated
│   │
│   ├── stores          # State management using Zustand
│   └── theme           # Theme and styling files
│
├── .nvmrc              # NVM configuration file
├── .prettierrc         # Prettier configuration file
├── app.json            # Configuration file for the React Native app
├── eslint.config.js    # ESLint configuration file
├── index.js            # Entry point for the React Native app
├── package.json        # Lists dependencies and scripts for the project
├── README.md           # Project documentation
└── tsconfig.json       # TypeScript configuration file
```

## Installation

To install the project, follow these steps:

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```
   cd DelBicosV2
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Running the Project

To run the project, use the following command:

```
npm start
```

This will start the development server.

### Running on Android Emulator

To run the project on an Android emulator, ensure you have the Android SDK and an emulator set up. Then, use the following command:

```
npm run android
```

### Running on iOS Simulator

To run the project on an iOS simulator, ensure you have Xcode installed. Then, use the following command:

```
npm run ios
```

### Running on Web

To run the project on a web browser, use the following command:

```
npm run web
```

## Linting and Formatting

To ensure code quality and consistency, this project uses ESLint and Prettier. You can run the following commands to lint and format your code:

### Linting

To check for linting errors, run:

```
npm run lint
```

### Fixing Linting Errors

To automatically fix linting errors, run:

```
npm run lint --fix
```

### Formatting

To check for formatting issues, run:

```
npm run format:check
```

### Fixing Formatting Issues

To automatically fix formatting issues, run:

```
npm run format:fix
```

## Recommended VS Code Extensions

To enhance your development experience with ESLint and Prettier, consider installing the following extensions:

- **ESLint**: Integrates ESLint into your editor for real-time linting.
- **Prettier - Code formatter**: Automatically formats your code according to Prettier's rules.
- **Prettier ESLint**: Ensures that Prettier and ESLint work together without conflicts.

By installing these extensions, you can maintain code quality and consistency throughout your project.
