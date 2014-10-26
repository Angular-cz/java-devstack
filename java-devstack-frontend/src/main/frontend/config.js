var util = require('gulp-util');

module.exports = {
  appliaction: {
    name: 'flickerDemo'
  },
  gulp: {
    httpServer: {
      host: util.env.HOST || 'localhost',
      port: util.env.PORT || 8282,
      lrPort: util.env.LRPORT || 35729,
      run: false,
      open: false
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
