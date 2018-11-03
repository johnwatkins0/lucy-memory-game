module.exports = ({ options, env }) => ({
    plugins: {
        'postcss-import': {},
        'postcss-preset-env': { stage: 2 },
        'cssnano': env === 'production' ? options.cssnano : false
    }
});