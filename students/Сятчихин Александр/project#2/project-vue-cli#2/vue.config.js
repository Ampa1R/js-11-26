module.exports = {
    devServer: {
        port: 8080,
        hot: true,
        open: false,
        proxy: {
            '/api': {
                target: 'http://localhost:3300',
                pathRewrite: { '^/api': '' },
                secure: false,
                changeOrigin: true
            }
        }
    }
}