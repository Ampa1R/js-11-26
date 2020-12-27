const  VueLoaderPlugin  = require("vue-loader/lib/plugin");

module.exports = {
    entry: './main.js',
    output: {
        filename: './bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    mode: 'production',
    watch: true,
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000,
    }
}