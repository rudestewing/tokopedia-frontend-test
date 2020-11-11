const tailwindcss = require('tailwindcss');

module.exports = {
    plugins: [
        // use tailwind config
        tailwindcss('./tailwind.config.js'),
        require('postcss-preset-env')
    ]
}