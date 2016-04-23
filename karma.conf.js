// Karma configuration
// Generated on Wed Oct 07 2015 09:57:15 GMT-0400 (EDT)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['bower', 'jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './src/test/js/app-test.js',
      './src/main/resources/static/public/app/**/*.js',
      './src/test/js/vendor/angular-resource.js',
      './src/test/js/vendor/angular-mocks.js',
      './src/test/js/specs/*.js',
      './src/test/js/specs/coffee/*.coffee'

    ],

    bowerPackages: [
      "jquery",
      "angular",
      "angular-messages",
      "datatables",
      "angular-animate",
      "v-accordion",
      "angular-translate",
      "ng-dialog",
      "angular-truncate",
      "angular-translate-loader-static-files",
      "angular-ui-router",
      "checklist-model",
      "angular-sanitize",
      "angular-datatables",
      "lodash",
      "angular-bootstrap",
      "angular-bootstrap-calendar",
      "angular-ui-calendar",
      "string-formatter",
      "ui-select",
      "ng-table",
      "console-polyfill",
      "ng-file-upload"
    ],

    // list of files to exclude
    exclude: [
      './src/main/resources/static/public/app/app.js',
      './src/main/resources/static/public/app/config/**/*',
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.coffee': ['coffee']
    },
    coffeePreprocessor: {
      // options passed to the coffee compiler
      options: {
        bare: true,
        sourceMap: true
      },
      // transforming the filenames
      transformPath: function (path) {
        return path.replace(/\.coffee$/, '.js')
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter

    reporters: ['jasmine-diff', 'spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine",
      "karma-bower",
      "karma-spec-reporter",
      "karma-coffee-preprocessor",
      "karma-jasmine-diff-reporter"
    ],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}