/* eslint-disable */

require('babel-core/register');

module.exports = function karma(config) {
  config.set({
    basePath: './',
    files: ['src/**/*.js', 'test/**/*.js'],

    frameworks: ['browserify', 'mocha', 'chai', 'sinon-chai'],
    browsers: ['PhantomJS'], // 'Chrome'

    preprocessors: {
      'src/**/*.js': ['browserify'],
      'test/**/*.js': ['browserify']
    },
    browserify: {
      debug: true,
      bundleDelay: 1000,
      transform: [['babelify', {
          ignore: /node_modules/
        }]
      ],
      extensions: ['.js']
    },

    reporters: ['mocha'],

    singleRun: false,
    autoWatch: true
  });
};
