# ReactTS Boilerplate

Welcome to **ReactTS Boilerplate**! This is a boilerplate for Dashboard development with ReactJS and typescript + AntDesign. This README will guide you through the setup, installation, and usage of the app.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following prerequisites:

- Node.js: [Download & Install Node.js](https://nodejs.org/)
- npm (Node Package Manager): It comes bundled with Node.js but make sure it's up to date. You can check this by running `npm -v`.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Auronex/react-ts-boilerplate.git
   ```

2. Navigate to the project directory:

   ```bash
   cd /react-ts-boilerplate
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Usage

To start the development server, run:

```bash
   npm run start
```

This will launch the app in your browser at [http://localhost:3000](http://localhost:3000).

### Features

1. Implementation of Typescript for ReactJS
2. Utilizing Ant-Design as UI library
3. Add AntD ProTable
4. Zod as validation and Type declarations
5. Continuous deployment using git actions for deployment at Elastic Beanstalk

### Folder Structure

To simplify your development, you can copy & paste the folder from _/src/pages/products_ and update the code accordingly.

Refer the folder structure below for your reference.

```
react-ts-boilerplate/
├── .github/
├── public/
│ ├── index.html
│ └── ...
├── src/
│ ├── components/
│ │ ├── Component1.tsx
│ │ ├── Component2.tsx
│ │ └── ...
│ ├── pages/
│ │ ├── api/
│ │ │ ├── apiFunctions.ts
│ │ ├── type/
│ │ │ ├── typeDefinitions.ts
│ │ ├── view/
│ │ │ ├── addEditPage.tsx
│ │ └── mainPage.tsx
│ ├── App.tsx
│ ├── index.tsx
│ └── ...
├── package.json
├── README.md
└── ...
```

### Contributing

Contributions are welcome! If you'd like to contribute to the project, follow these steps:

1. **Fork the repository.**
2. **Create a new branch:** `git checkout -b feat/your-feature-name`.
3. **Commit your changes:** `git commit -m 'feat:Add your changes'`.
4. **Push to the branch:** `git push origin feat/your-feature-name`.
5. **Open a pull request on GitHub.**
