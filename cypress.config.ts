import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    env: {
      "cypress-watch-and-reload": {
        watch: ["app/**/*", "components/**/*", "lib/**/*"],
      },
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return require("cypress-watch-and-reload/plugins")(on, config)
    },
  },

  component: {
    env: {
      "cypress-watch-and-reload": {
        watch: ["app/**/*", "components/**/*", "lib/**/*"],
      },
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return require("cypress-watch-and-reload/plugins")(on, config)
    },
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
})
