module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/SimplePYBotDashboard/" : "/",
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