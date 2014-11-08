var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var del = require('del');
var esteWatch = require('este-watch');
var mainBowerFiles = require('main-bower-files');
var minimatch = require("minimatch");
var open = require('open');
var runSequence = require('run-sequence');
var url = require('url');

var config = require('./config.js');

config.gulp.isProduction = false;
if (config.gulp.httpServer.host === 'localhost') {
  config.gulp.httpServer.run = true;
  config.gulp.httpServer.open = true;
}

config.gulp.filepath = {
  index: config.gulp.dirs.src + config.gulp.filename.index,
  css: config.gulp.dirs.srcCss + config.gulp.filename.css,
  less: config.gulp.dirs.srcLess + config.gulp.filename.less,
  js: {
    application: config.gulp.dirs.src + config.gulp.filename.js.application,
    vendor: config.gulp.dirs.src + config.gulp.filename.js.vendor,
    templates: config.gulp.dirs.src + config.gulp.filename.js.templates
  }
};

config.gulp.generatedFiles = [
  config.gulp.dirs.src + config.gulp.filename.js.application,
  config.gulp.dirs.src + config.gulp.filename.js.vendor,
  config.gulp.dirs.src + config.gulp.filename.js.templates
];

config.gulp.destinationDir = config.gulp.dirs.src;
if (config.gulp.isProduction) {
  config.gulp.destinationDir = config.gulp.dirs.build;
}

config.gulp.paths = {
  scripts: [
    config.gulp.dirs.src + '**/*.js',
    '!' + config.gulp.dirs.src + '**/*spec.js'
  ],
  templates: [
    config.gulp.dirs.srcApp + '**/*.html'
  ],
  less: [
    config.gulp.dirs.srcLess + '**/*.less'
  ],
  livereload: config.gulp.generatedFiles
};

config.gulp.paths.livereload.push(config.gulp.destinationDir + config.gulp.dirs.parts.css + 'styles.css');

config.gulp.paths.scripts = config.gulp.paths.scripts.concat(config.gulp.generatedFiles.map(function(path) {
  return '!' + path;
}));

/**
 * @param {object} options {option.host, option.port}
 */
function httpServer(options) {
  if (!options.run) {
    return;
  }

  var connect = require('connect');
  var proxy = require('proxy-middleware');
  var serveStatic = require('serve-static');

  var app = connect();

  if (options.proxy) {
    var route = options.proxy.routePath || '/api';
    if (!options.proxy.destinationUrl) {
      throw new Error('No proxy settings. You must set gulp.httpServer.proxy.destinationUrl');
    }

    app.use(route, proxy(url.parse(options.proxy.destinationUrl)));
  }

  app.use(serveStatic('./'));
  app.listen(options.port);
  console.log("HTTP server running on ", options.host + ":" + options.port);

  if (options.open) {
    var appUrl = 'http://' + options.host + ":" + options.port + '/' + config.gulp.dirs.src;
    console.log('Opening ' + appUrl);
    open(appUrl);
  }
}

gulp.task('templates', function() {
  return gulp.src(config.gulp.paths.templates)
      .pipe(plugins.angularTemplatecache(config.gulp.filename.js.templates, {module: config.appliaction.name}))
      .pipe(gulp.dest(config.gulp.destinationDir));
});

gulp.task('js-lint', function() {
  return gulp.src(config.gulp.paths.scripts)
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.jshint.reporter('fail'));
});

gulp.task("js-vendor", function() {
  var bowerJsFitler = plugins.filter(['**/*.js', '!**/bootstrap.js']);

  return gulp.src(mainBowerFiles())
      .pipe(plugins.plumber())
      .pipe(bowerJsFitler)
      .pipe(plugins.if(config.gulp.isProduction,
          plugins.concat(config.gulp.filename.js.vendor),
          plugins.pseudoconcatJs(config.gulp.filename.js.vendor, {webRoot: config.gulp.dirs.src}, ['//' + config.gulp.httpServer.host + ':' + config.gulp.httpServer.lrPort + '/livereload.js'])
          ))
      .pipe(gulp.dest(config.gulp.destinationDir));
});

gulp.task("js-main", ['js-lint', 'templates'], function() {
  var angularScripts = config.gulp.paths.scripts.slice(0);  // clone
  var tempalateJSIndex = angularScripts.indexOf('!' + config.gulp.filepath.js.templates);
  if (tempalateJSIndex > 0) {
    angularScripts.splice(tempalateJSIndex, 1);
  }

  return gulp.src(angularScripts)
      .pipe(plugins.plumber())
      .pipe(plugins.angularFilesort())
      .pipe(plugins.ngAnnotate())
      .pipe(plugins.if(config.gulp.isProduction,
          plugins.concat(config.gulp.filename.js.application),
          plugins.pseudoconcatJs(config.gulp.filename.js.application, {webRoot: config.gulp.dirs.src})
          ))
      .pipe(gulp.dest(config.gulp.destinationDir));
});

gulp.task('less', function() {
  return gulp.src(config.gulp.filepath.less)
      .pipe(plugins.plumber())
      .pipe(plugins.less())
      .pipe(gulp.dest(config.gulp.destinationDir + config.gulp.dirs.parts.css));
});

gulp.task("watch", function() {
  plugins.livereload.listen(config.gulp.httpServer.lrPort);
  httpServer(config.gulp.httpServer);
  esteWatch([config.gulp.dirs.src], function(e) {

    if (config.gulp.generatedFiles.some(function(pattern) {
      return minimatch(e.filepath, pattern);
    })) {
      return;
    }

    switch (e.extension) {
      case 'html':
        gulp.start('templates');
        break;
      case 'js':
        testFilePattern = /.spec.js$/;
        if (!testFilePattern.test(e.filepath)) {
          gulp.start('js-main');
        }
        break;
      case 'less':
        gulp.start('less');
        break;
    }
  }).start();

  gulp.watch(config.gulp.paths.livereload).on('change', function(filepath) {
    plugins.livereload.changed(filepath, config.gulp.httpServer.lrPort);
  });
});

gulp.task('devel', function() {
  runSequence(
      ['less', 'js-vendor', 'js-main'],
      'watch'
      );
});

gulp.task('build-clean', function(cb) {
  del([
    config.gulp.dirs.build
  ], cb);
});

gulp.task('build-index', function() {
  return gulp.src(config.gulp.filepath.index)
      .pipe(gulp.dest(config.gulp.dirs.build));
});

gulp.task('build-js', ['js-vendor', 'js-main'], function() {
  return gulp.src([config.gulp.filepath.js.application, config.gulp.filepath.js.vendor])
      .pipe(plugins.uglify())
      .pipe(gulp.dest(config.gulp.dirs.build));
});

gulp.task('build-css', ['less'], function() {
  return gulp.src([config.gulp.filepath.css])
      .pipe(plugins.cssmin())
      .pipe(gulp.dest(config.gulp.dirs.buildCss));
});

gulp.task('build-test', function() {
  var testFiles = [
    'test/utils/Function.bind.polyfill.js',
    'build/vendor.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'build/scripts.js',
    'src/**/*.spec.js'
  ];

  return gulp.src(testFiles)
      .pipe(plugins.karma({
        configFile: 'test/karma.conf.js',
        action: 'run'
      }))
      .on('error', function(err) {
        // Make sure failed tests cause gulp to exit non-zero
        throw err;
      });
});

gulp.task('build', ['build-clean'], function() {
  config.gulp.isProduction = true;

  runSequence(
      ['build-js', 'build-css'],
      'build-index'
      );

});

gulp.task('default', ['build']);