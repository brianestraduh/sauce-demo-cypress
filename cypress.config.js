const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    baseUrl: 'https://www.saucedemo.com/',
    supportFile: false,
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      // parameterizing tests to run against different environments (local/prod)
      const environmentName = config.env.environmentName || 'prod'
      const environmentFileName = `./${environmentName}.settings.json`
      console.log('loading %s', environmentFileName)
      const settings = require(environmentFileName)
      if (settings.baseUrl) {
        config.baseUrl = settings.baseUrl
      }
      if(settings.env){
        config.env = {
        ...config.env,
        ...settings.env
        }
      }
      console.log('loaded settings for environment %s', environmentName)
      return config
    },
  },
})