module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'no-use-before-define': 'off',
    camelcase: 'off',
    'object-shorthand': 'off',
    'no-param-reassign': 'off',
    'react/jsx-curly-newline': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
  },
};
