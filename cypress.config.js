const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "sunvy1",
    e2e: {
        env: {
            apiBaseUrl: "http://192.168.66.23:8000/api",
            // Login credentials from environment variables
            username: process.env.CYPRESS_USERNAME || "defaultUser",
            password: process.env.CYPRESS_PASSWORD || "defaultPass",
            urls: {
                pro_trading: {
                    baseUrl:
                        "https://uat-pro-trading.phs.vn/customize?layout=classic",
                    api: "https://uat-pro-trading.phs.vn/api/",
                },
            },
            endpoints: {
                handle: "/otp/handle",
            },
        },
        setupNodeEvents(on, config) {},
    },

    component: {
        devServer: {
            framework: "react",
            bundler: "vite",
        },
    },
});
