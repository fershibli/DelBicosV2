<p align="center">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="assets/DelBicos_git.png">
      <source media="(prefers-color-scheme: light)" srcset="assets/DelBicos_LogoH.png">
      <img alt="Shows a black logo in light color mode and a white one in dark color mode." src="assets/DelBicos_git.png">
    </picture>
</p>

# DelBicosV2

DelBicos - Delivery de Bicos, é um projeto que propõe conectar clientes e trabalhadores informais na mesma vizinhança, garantindo demanda local, qualidade e segurança e será projetado através de um website.

Profissionais informais, de diversas vertentes, têm muita dificuldade para adquirir clientes na sua região de atuação, muitas vezes tendo que se deslocar por longas distâncias para chegar aos seus clientes, quando não o inverso. Enquanto que na outra ponta, clientes que se mudaram há pouco tempo para a região encontram muita dificuldade e insegurança ao procurar por profissionais confiáveis para realizar tarefas em suas residências.

Ao solucionar esse problema, notaria-se também os seguintes benefícios para a sociedade:

- a diminuição do translado entre cliente e profissional, que causaria a redução da emissão de gases do efeito estufa nesta atividade;
- o aumento de demanda para profissionais de diversas comunidades, contribuindo com a redução da desigualdade social;
- a integração de indivíduos no ciclo de consumo de serviços locais, levando à melhora na qualidade de vida;
- o acompanhamento das atividades e avaliações, levando a melhor confiabilidade e segurança.

Os dois grupos destacados no problema descrito, compõem o público-alvo deste projeto.

## Equipe

| Fernando Chibli      | _Product Owner_  |
| :------------------- | ---------------- |
| **Douglas Wenzel**   | _Scrum Master_   |
| **Gustavo Ferreira** | _Desenvolvedor_  |
| **Andreza Oliveira** | _Desenvolvedora_ |
| **Isabel Maito**     | _Desenvolvedora_ |

## Tecnologias

![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white) ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Swift](https://img.shields.io/badge/swift-F54A2A?style=for-the-badge&logo=swift&logoColor=white) ![Objective-C](https://img.shields.io/badge/OBJECTIVE--C-%233A95E3.svg?style=for-the-badge&logo=apple&logoColor=white) ![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white) ![Kotlin](https://img.shields.io/badge/Kotlin-0095D5?&style=for-the-badge&logo=kotlin&logoColor=white) ![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white) ![MaterialUI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white) ![Node](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Zustand](https://img.shields.io/badge/Zustand-007ACC?style=for-the-badge&logo=React&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white) ![Penpot](https://img.shields.io/badge/Penpot-000000?style=for-the-badge&logo=penpot&logoColor=white) ![Gimp](https://img.shields.io/badge/gimp-5C5543?style=for-the-badge&logo=gimp&logoColor=white) ![Inkscape](https://img.shields.io/badge/Inkscape-000000?style=for-the-badge&logo=Inkscape&logoColor=white) ![Vscode](https://img.shields.io/badge/Vscode-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white) ![iOS](https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white)

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
