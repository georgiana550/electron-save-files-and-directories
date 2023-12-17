# Electron, TypeScript, MUI (formerly Material-UI), React Boilerplate

## Requires

- [Node.js 16.x](https://nodejs.org/en/)
- [NPM >= 7.x](https://github.com/npm/cli)

## Recommended tools

- [Visual Studio Code](https://code.visualstudio.com/)
  - [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (formatting)
  - [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (error checking)
- [NVM](https://github.com/nvm-sh/nvm) (mac only. helps to manage multiple node.js versions on your machine)

## Getting Started

1. Clone this repo: git clone https://github.com/georgiana550/electron-save-files-and-directories.git
2. Navigate to the project root

```sh
cd myapp
```

3. Hope you hvae installed NPM, run the following command to install dependencies:

```sh
npm install
```

4. Run the following command to build and start the development version of your app with live reloading.
Also, here you have the opetion to inspect element (right click + inspect element for console.log and CSS)
This app uses Electron, ReactJS and MUI

```sh
npm run dev
```

## About
File management application leveraging Electron, ReactJS, and Material-UI to simplify file and directories organization and manipulation.

Features
1. Add Files and Directories: Easily add individual files or entire directories through a user-friendly interface.
2. Drag and Drop Functionality: Streamline file management by dragging and dropping files between folders.
3. Files: View file logos based on their extensions for quick identification and categorization.
4. Auto Backup: Automatically saves a backup of files within a local folder upon closing the application.

## Install app
```sh
npm i
```
```sh
npm run dev
```

## Start app
npm run dev

## How to package the app 
https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging
# install
```sh
npm install --save-dev @electron-forge/cli
npx electron-forge import
```

# Add in package.json scripts (already there):
```sh
"scripts": {
  "start": "electron-forge start",
  "package": "electron-forge package",
  "make": "electron-forge make"
}
```

# Creating a distributable
```sh
npm run make
```