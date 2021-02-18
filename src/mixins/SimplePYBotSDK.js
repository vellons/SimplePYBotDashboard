export const simplePYBotSDK = {
    data: () => ({
        webServerUrl: "http://localhost:8000/api/v1/robot",
        webSocketUrl: "ws://localhost:65432/",
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
