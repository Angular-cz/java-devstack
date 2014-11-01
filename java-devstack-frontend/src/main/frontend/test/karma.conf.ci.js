module.exports = function(config) {
  config.set({
    basePath: '../',
    files:[
      'test/utils/Function.bind.polyfill.js',
      'build/vendor.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'build/scripts.js',
      'src/**/*.spec.js'
    ],
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],
    autoWatch: false,
    singleRun: true,
    reporters: ['progress']

  });
};
