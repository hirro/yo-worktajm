// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    browsers: ['Firefox'],    
    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/jquery/jquery.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/restangular/dist/restangular.js',
      'app/bower_components/lodash/lodash.js',
      'app/bower_components/angular-webstorage/angular-webstorage.js',
      'app/bower_components/angular-tokenauth/angular-tokenauth.js',
      'app/bower_components/toastr/toastr.js',
      'app/scripts/*.js',
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],
    captureTimeout: 60000,
    colors: true,
    exclude: ['dist/'],

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,
    port: 9876,
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage'
    ],
    runnerPort: 9100,
    singleRun: true,
    autoWatch: false,
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },
    preprocessors: {
      'src/angular-cache.js': ['coverage']
    },
    reporters: ['progress', 'coverage']
  });
};
