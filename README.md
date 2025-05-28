<p align="center">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/8f678029-be34-4be1-83f3-4c7fd21eb035">
      <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/2a47dadf-6288-4ae8-a0a7-d066e3ccf52a">
      <img alt="Shows a black logo in light color mode and a white one in dark color mode." src="https://user-images.githubusercontent.com/25423296/163456779-a8556205-d0a5-45e2-ac17-42d089e3c3f8.png">
    </picture>
</p>

# DelBicosV2

## Project Structure

```
DelBicosV2
├── 📁 src
│  ├── 🖼️ assets        # Static assets like images and fonts
│  ├── 🧩 components    # Reusable React components
│  ├── ⚙️ config        # Configuration files for the application
│  │
│  ├── lib
│  │  ├── 🧱 constants  # Constants used throughout the application
│  │  ├── 🔧 helpers    # Helper functions and utilities
│  │  └── 🪝 hooks      # Custom React hooks
│  │
│  ├── 🖥️ screens       # Main screens of the application and navigation
│  │  ├── 🔐 private    # Private screens requiring authentication
│  │  └── 🔓 public     # Public screens accessible unauthenticated
│  │
│  ├── 💾 stores        # State management using Zustand
│  └── 🎨 theme         # Theme and styling files
│
├── ⚙️ .nvmrc            # NVM configuration file
├── ⚙️ .prettierrc       # Prettier configuration file
├── ⚙️ app.json          # Configuration file for the React Native app
├── ⚙️ eslint.config.js  # ESLint configuration file
├── 📄 index.js          # Entry point for the React Native app
├── 📦 package.json      # Lists dependencies and scripts for the project
├── 📖 README.md         # Project documentation
└── ⚙️ tsconfig.json     # TypeScript configuration file
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

By installing these extensions, you can maintain code quality and consistency throughout your project.
