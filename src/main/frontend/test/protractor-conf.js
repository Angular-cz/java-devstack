exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    'scenarios/**/*.js'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: 'http://localhost:8282/src/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
