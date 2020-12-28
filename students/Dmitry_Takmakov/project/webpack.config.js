const path = require('path');

module.exports = {
    entry: './static/js/script.js',
    module: {
        rules: [
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
            { test: /\.(js)$/, use: 'babel-loader' },
            { test: /\.(png|jpg|svg|gif)$/i, use: ['file-loader']
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: 'bundle.js'
    },
    mode: 'production'
};