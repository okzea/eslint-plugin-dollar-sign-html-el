const { RuleTester } = require('eslint');
const rule = require('../html-element-variable-prefix');

const ruleTester = new RuleTester({
  // ESLint requires parserOptions for modern JS features like `const`
  parserOptions: { ecmaVersion: 2015 }
});

ruleTester.run('html-element-variable-prefix', rule, {
  valid: [
    // Valid: $ prefix for document.createElement
    {
      code: "const $myElement = document.createElement('div');",
    },
    // Valid: $$ prefix for document.querySelectorAll
    {
      code: "const $$elements = document.querySelectorAll('.my-class');",
    },
    // Valid: Irrelevant variable declaration (no error)
    {
      code: "const myVar = 123;",
    },
    {
      code: "const anotherVar = initOtherThing();",
    },
    // Valid: Variable already has $ prefix, but not a recognized HTML element creation (should not error, rule focuses on *enforcing* prefix for specific cases)
    {
      code: "const $notAnElement = другойКод();" // Using Cyrillic to ensure it's not accidentally matching 'document' or 'createElement'
    },
    // Valid: Variable with $$ prefix, but not a recognized HTML collection (should not error)
    {
      code: "const $$notACollection = другойКодКоллекции();"
    }
  ],
  invalid: [
    // Invalid: Missing $ prefix for document.createElement
    {
      code: "const myElement = document.createElement('div');",
      errors: [{ message: 'Variable representing HTML element should start with $ prefix' }],
    },
    // Invalid: Missing $$ prefix for document.querySelectorAll
    {
      code: "const myElements = document.querySelectorAll('.my-class');",
      errors: [{ message: 'Variable representing HTML collection should start with $$ prefix' }],
    },
    // Invalid: Incorrect $$ prefix for document.createElement (should be $)
    {
      code: "const $$myElement = document.createElement('div');",
      errors: [{ message: 'Variable representing HTML element should start with $ prefix' }],
    },
    // Invalid: Incorrect $ prefix for document.querySelectorAll (should be $$)
    {
      code: "const $myElements = document.querySelectorAll('.my-class');",
      errors: [{ message: 'Variable representing HTML collection should start with $$ prefix' }],
    },
  ],
});

console.log('Test file created and populated with test cases.');
