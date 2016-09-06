/* eslint-disable */

require('babel-core/register');

module.exports = function karma(config) {
  config.set({
    basePath: './',
    files: ['test/**/*.js'],

    frameworks: ['browserify', 'mocha', 'chai', 'sinon-chai'],
    browsers: ['Chrome'],
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
