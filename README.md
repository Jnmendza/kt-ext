# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```
<<<<<<< HEAD
=======
git clone https://github.com/omribarmats/chrome-extension-starter.git new-project
```
* Replace `new-project` with your project name

### Open the new directory:
```
cd new-project
```
### Install dependencies:
```
npm install
```
### Start the development server:
```
npm run dev
```
## Load the Extension
>>>>>>> f96fc12 (Update README.md)

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

<<<<<<< HEAD
```js
// eslint.config.js
import react from "eslint-plugin-react";
=======
## Development
- Hot-reload enabled for easier development.
- Modify your code in the src folder.
- Tailwind CSS is already configured and ready to use.
- Run `nmp run build` to implement changes to `dist` folder
- Go on `chrome://extensions/` and click refresh `⟳`

### How to change the popup? 
- Go on `src/chrome-extension/popup/index.tsx`
- Once changes are done run `nmp run build` and then visit your project on `chrome://extensions/` and click refresh `⟳`

### How to change the options page? 
- Go on `src/chrome-extension/options/index.tsx`
- Once changes are done run `nmp run build` and then visit your project on `chrome://extensions/` and click refresh `⟳`
>>>>>>> 4842a11 (Update README.md)

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
