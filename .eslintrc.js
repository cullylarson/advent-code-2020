module.exports = {
    'ignorePatterns': ['.eslintrc.js'],
    'extends': ['standard'],
    'env': {
        'es6': true,
        'node': true,
        'jest': true,
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'script',
    },
    'rules': {
        'indent': ['error', 4, {'SwitchCase': 1}],
        'space-before-function-paren': ['error', 'never'],
        'keyword-spacing': 'off',
        'brace-style': ['error', 'stroustrup', {'allowSingleLine': true}],
        'quotes': ['error', 'single', {'avoidEscape': true}],
        'comma-dangle': ['error', 'always-multiline'],
        'operator-linebreak': ['error', 'before'],
        'object-curly-spacing': ['error', 'never'],
        'space-before-function-paren': ['error', {
            'anonymous': 'never',
            'named': 'never',
            'asyncArrow': 'always',
        }],
    },
}
