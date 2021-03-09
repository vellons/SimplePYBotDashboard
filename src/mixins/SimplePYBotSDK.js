export const simplePYBotSDK = {
    data: () => ({
        webServerUrl: "/api/v1/robot", // proxy
        webSocketUrl: "ws://localhost:65432",
    }),
    methods: {
        getWebServerUrl: function () {
            return this.webServerUrl
        },
        getWebSocketUrl: function () {
            return this.webSocketUrl
        }
    }
}
