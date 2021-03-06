module.exports = {
    env: {
        browser: true,
        es6: true,
        'jest/globals': true
    },
    parser: 'babel-eslint',
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: ['react', 'jest', 'react-hooks'],
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'react-hooks/rules-of-hooks': 'error'
    }
};
