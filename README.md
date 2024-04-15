# ESLint Plugin: eslint-plugin-dollar-sign-html-el

Enforce the use of $ prefix for variable names representing HTML elements and $$ prefix for HTML element collections in JavaScript code.

## Installation

You can install this ESLint plugin using npm:

```bash
npm install eslint-plugin-dollar-sign-html-el --save-dev
```
# Usage
Once installed, add eslint-plugin-dollar-sign-html-el to your ESLint configuration file (e.g., .eslintrc.js):

```javascript
module.exports = {
  plugins: ['dollar-sign-html-el'],
  rules: {
    'dollar-sign-html-el/html-element-variable-prefix': 'error'
  }
};
```

This will enable the rule to enforce the use of $ prefix for variable names representing HTML elements and $$ prefix for HTML element collections.

# Rules
## html-variable-prefix/html-variable-prefix
This rule enforces the use of $ prefix for variable names representing HTML elements and $$ prefix for HTML element collections.

# Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on GitHub.

# License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
