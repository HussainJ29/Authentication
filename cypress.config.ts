const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on:any , config:any) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
    baseUrl: "http://localhost:3000", // Update with your base URL
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts"
  },
});
