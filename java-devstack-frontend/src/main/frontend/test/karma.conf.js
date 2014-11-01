module.exports = function(config) {
  config.set({
    basePath: '../',
    files: [
      'test/utils/Function.bind.polyfill.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/app/**/*.js',
      'src/common/**/*.js'
    ],
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    plugins: [
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage',
      'karma-junit-reporter'
    ],
    autoWatch: true,
    singleRun: false,
    reporters: ['progress', 'coverage'],
    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },
    preprocessors: {'src/**/*.js': ['coverage']},
    coverageReporter: {
      type: 'html', 
      dir: 'report/', 
      file: 'report.html'
    }

  });
};
