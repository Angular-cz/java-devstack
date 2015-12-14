var util = require('gulp-util');

module.exports = {
  application: {
    name: 'administration'
  },
  gulp: {
    httpServer: {
      host: util.env.HOST || 'localhost',
      port: util.env.PORT || 8282,
      lrPort: util.env.LRPORT || 35729,
      run: true,
      open: false,
      proxy: false
      //proxy: {
      //  routePath: '/src/api',
      //  destinationUrl: 'http://localhost:8080/api'
      //}
    },
    dirs: {
      build: 'build/',
      src: 'src/',
      parts: {
        app: 'app/',
        css: 'css/',
        less: 'less/',
        assets: [
          'img/**/*',
          'fonts/**/*'
        ]
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
        templates: 'templates.js',
        templatesVendor: 'templates-vendor.js'
      }
    }
  }
};
