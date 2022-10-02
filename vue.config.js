module.exports = {
    publicPath: "/SimplePYBotDashboard/",
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:8000',
                ws: true,
                changeOrigin: true
            }
        }
    }
}