exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    'scenarios/**/*.js'
  ],
  capabilities: {
    'browserName': 'firefox'
  },
  baseUrl: 'http://localhost:8080/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
