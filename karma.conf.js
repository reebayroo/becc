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
      './static/public/app/app.js',
      './static/public/app/**/*.js',
      './static/public/libs/lodash/lodash.js',
      './static/public/libs/ngstorage/ngStorage.js',
      './static/public/libs/string-formatter/string-formatter.js',
      './specs/lib/angular-resource.js',
      './specs/lib/angular-mocks.js',
      './specs/app/coffee/**/*.coffee'

    ],

    bowerPackages: [
      "jquery",
      "angular"
    ],

    // list of files to exclude
    exclude: [
      './static/public/app/config/**/*',
    ],
    // './static/public/app/app.js',


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