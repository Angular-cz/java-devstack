var util = require('gulp-util');
var url = require('url');

module.exports = {
  appliaction: {
    name: 'javaDemo'
  },
  gulp: {
    httpServer: {
      host: util.env.HOST || 'localhost',
      port: util.env.PORT || 8282,
      lrPort: util.env.LRPORT || 35729,
      run: false,
      open: false,
      proxy: false //url.parse('http://api.openbeerdatabase.com/v1/')
    },
    dirs: {
      build: 'build/',
      src: 'src/',
      parts: {
        app: 'app/',
        css: 'css/',
        less: 'less/'
      },
      srcApp: 'src/app/',
      srcCss: 'src/css/',
      srcLess: 'src/less/',
      buildCss: 'build/css/'
    },
    filename: {
      index: 'index.html',
      less: 'styles.less',
      css: 'styles.css',
      js: {
        application: 'scripts.js',
        vendor: 'vendor.js',
        templates: 'templates.js'
      }
    }
  }
};
