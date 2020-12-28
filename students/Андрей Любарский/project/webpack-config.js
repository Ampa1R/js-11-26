const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {

    entry: path.resolve(__dirname, 'main.js'),

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    resolve: {
        extensions: ['*', '.js', '.vue', '.json']
    },

    watch: true,

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css/i,
                use: ['style-loader', 'css-loader']
            },

            {
                test: /\.(png|jpe?g|gif)$/i,
                use: ['file-loader']
            },

            {
                test: /\.vue$/i,
                use: ['vue-loader']
            }


        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'dist/index.html'),
            inject: 'body'
        }),
        new VueLoaderPlugin()
    ]

};