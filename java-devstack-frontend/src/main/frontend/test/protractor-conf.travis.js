exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    'scenarios/**/*.js'
  ],

  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  capabilities: {
    'browserName': 'chrome',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER,
    'name': 'Java-devstack protractor test',

    baseUrl: 'http://localhost:8080/',
    framework: 'jasmine',
    jasmineNodeOpts: {
      defaultTimeoutInterval: 30000
    }

  }
};
