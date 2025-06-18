<p align="center">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="assets/DelBicos_git.png">
      <source media="(prefers-color-scheme: light)" srcset="assets/DelBicos_LogoH.png">
      <img alt="Shows a black logo in light color mode and a white one in dark color mode." src="assets/DelBicos_git.png">
    </picture>
</p>

<p align="center">

[About](#-about) | [Backlogs & User Stories](#-backlogs--user-stories) | [Prototype & Documentation](#-prototype-documentation) | [Tecnologies](#️-tecnologies) | [Team](#-team) | [Project Structure](#-project-structure) | [Installation](#️-installation) | [Backend Project](https://github.com/fershibli/DelBicosBackend)

</p>

# 💻 About

DelBicos - Delivery de Bicos, é um projeto que propõe conectar clientes e trabalhadores informais na mesma vizinhança, garantindo demanda local, qualidade e segurança e será projetado através de um website.

Profissionais informais, de diversas vertentes, têm muita dificuldade para adquirir clientes na sua região de atuação, muitas vezes tendo que se deslocar por longas distâncias para chegar aos seus clientes, quando não o inverso. Enquanto que na outra ponta, clientes que se mudaram há pouco tempo para a região encontram muita dificuldade e insegurança ao procurar por profissionais confiáveis para realizar tarefas em suas residências.

Ao solucionar esse problema, notaria-se também os seguintes benefícios para a sociedade:

- a diminuição do translado entre cliente e profissional, que causaria a redução da emissão de gases do efeito estufa nesta atividade;
- o aumento de demanda para profissionais de diversas comunidades, contribuindo com a redução da desigualdade social;
- a integração de indivíduos no ciclo de consumo de serviços locais, levando à melhora na qualidade de vida;
- o acompanhamento das atividades e avaliações, levando a melhor confiabilidade e segurança.

Os dois grupos destacados no problema descrito, compõem o público-alvo deste projeto.
>
 ### Repositórios do Projeto
- [Backend do DelBicos](https://git@github.com:fershibli/DelBicosBackend.git)  
- [Frontend do DelBicos](https://git@github.com:fershibli/DelBicosV2.git)  
- [Documentação Oficial](https://)

 📌 **Status:** _Em desenvolvimento_

 ### 🏁 Entregas de Sprints
Cada entrega possui uma branch neste repositório com um relatório completo de tudo o que foi desenvolvido naquela sprint. Observe a relação a seguir:
| Sprint | Ínício | Fim | Status | Histórico |
|:--:|:----------:|:----------:|:---------------:|:-------------------------------------------------:|
| 01 | 17/03/2025 | 01/05/2025 |✔️ Concluída    | [ver relatório]() |
| 02 | 01/04/2025 | 16/05/2025 |🔄 Em Andamento    | [ver relatório]() |


## 🎯 Backlogs & User Stories

<image src="assets/backlogP.png" alt="Backlog de Produtos do projeto DelBicos" width="60%">
<image src="assets/backlogS.png" alt="Backlog de Sprints do projeto DelBicos" width="60%">

<br>

## 💡 Requisitos Funcionais

- **_Requisitos Funcionais - Cliente_**

| Número do Requisito | Nome                                      | Descrição                                                                                              |
| :-----------------: | ----------------------------------------- | ------------------------------------------------------------------------------------------------------ |
|        RFC01        | Efetuar Login                             | O cliente pode fazer login no sistema.                                                                 |
|        RFC02        | Acessar Home                              | O cliente pode acessar a página inicial após o login.                                                  |
|        RFC03        | Cadastrar Cliente                         | O cliente tem a opção de se cadastrar no sistema.                                                      |
|        RFC04        | Alternar Cliente/Profissional             | O cliente pode alternar entre as visualizações de cliente e profissional, caso tenha múltiplos perfis. |
|        RFC05        | Listar Serviços por Categoria             | O cliente pode listar serviços por categoria.                                                          |
|        RFC06        | Listar Serviços por Profissional          | O cliente pode listar serviços oferecidos por um profissional específico.                              |
|        RFC07        | Escolher Horários e Datas do Profissional | O cliente pode escolher um horário e data para o serviço desejado com o profissional.                  |
|        RFC08        | Efetuar Pagamento                         | O cliente pode realizar o pagamento dos serviços.                                                      |
|        RFC09        | Consultar Serviços Agendados              | O cliente pode consultar os serviços já agendados.                                                     |

<p>

- **_Requisitos Funcionais - Profissional_**

| Número do Requisito | Nome                                | Descrição                                                            |
| :-----------------: | ----------------------------------- | -------------------------------------------------------------------- |
|        RFP01        | Efetuar Login                       | O profissional pode fazer login no sistema.                          |
|        RFP02        | Cadastrar Profissional              | O usuário tem a opção de se cadastrar no sistema como profissional.  |
|        RFP03        | Acessar Painel do Profissional      | O profissional pode acessar o painel com suas funcionalidades.       |
|        RFP04        | Verificar Serviços Agendados        | O profissional pode verificar os serviços já agendados por clientes. |
|        RFP05        | Alterar Tabela de Valores           | O profissional pode alterar a tabela de valores de seus serviços.    |
|        RFP06        | Alterar Disponibilidade de Horários | O profissional pode alterar sua disponibilidade de horários.         |

<p>

- **_Requisitos Funcionais - Administrador_**

| Número do Requisito | Nome                                      | Descrição                                                                             |
| :-----------------: | ----------------------------------------- | ------------------------------------------------------------------------------------- |
|        RFA01        | Autenticar Administrador                  | O administrador pode se autenticar no sistema.                                        |
|        RFA02        | Gerenciar Clientes                        | O administrador pode gerenciar o cadastro de clientes.                                |
|        RFA03        | Gerenciar Profissionais                   | O administrador pode gerenciar o cadastro de profissionais.                           |
|        RFA04        | Analisar chamados                         | O administrador pode analisar chamados de clientes e profissionais.                   |
|        RFA05        | Gerenciar Serviços Realizados e Pendentes | O administrador pode gerenciar os serviços realizados e os que ainda estão pendentes. |
|        RFA06        | Aprovar/Desaprovar Estornos               | O administrador pode aprovar ou desaprovar pedidos de estorno.                        |

<br>

## Prototype & Documentation

#### Protótipo
O protótipo do projeto foi desenvolvido na ferramenta Figma, trabalhando padronização de componentes e cores, disponível em:
- [Link para o protótipo do projeto](https://www.figma.com).

  #### Documentação
Para a documentação, utilizamos várias ferramentas para criação de diagramas e de texto. Como Microsoft Word, Excel, Astah e Photopea. A documentação está disponível em:
- [Link para a documentação delBicos](https://)

## 🛠️ Tecnologies

![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white) ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Swift](https://img.shields.io/badge/swift-F54A2A?style=for-the-badge&logo=swift&logoColor=white) ![Objective-C](https://img.shields.io/badge/OBJECTIVE--C-%233A95E3.svg?style=for-the-badge&logo=apple&logoColor=white) ![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white) ![Kotlin](https://img.shields.io/badge/Kotlin-0095D5?&style=for-the-badge&logo=kotlin&logoColor=white) ![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white) ![MaterialUI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white) ![Node](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Zustand](https://img.shields.io/badge/Zustand-007ACC?style=for-the-badge&logo=React&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white) ![Penpot](https://img.shields.io/badge/Penpot-000000?style=for-the-badge&logo=penpot&logoColor=white) ![Gimp](https://img.shields.io/badge/gimp-5C5543?style=for-the-badge&logo=gimp&logoColor=white) ![Inkscape](https://img.shields.io/badge/Inkscape-000000?style=for-the-badge&logo=Inkscape&logoColor=white) ![Vscode](https://img.shields.io/badge/Vscode-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white) ![iOS](https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white)

<br>

## 👥 Team

|       Nome       | Função           |
| :--------------: | ---------------- |
| Fernando Chibli  | _Product Owner_  |
|  Douglas Wenzel  | _Scrum Master_   |
| Andreza Oliveira | _Desenvolvedora_ |
| Gustavo Ferreira | _Desenvolvedor_  |
|   Isabel Maito   | _Desenvolvedora_ |

<br>

## 📝 Project Structure

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

## ⚙️ Installation

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
