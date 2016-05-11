/* eslint-disable */

var path = require('path');
var fs = require('fs');
var wallabyWebpack = require('wallaby-webpack');
var babel = require('babel-core');

module.exports = function (wallaby) {

  var webpackConfig = {
    resolve: {
      root: path.join(wallaby.projectCacheDir, 'src', 'imports'),
      extensions: ['', '.js', '.jsx', '.json']
    },
    module: {
      loaders: [
        // JavaScript is handled by the Wallaby Babel compiler
        { test: /\.json$/, loader: 'json-loader' }
      ]
    }
  };

  var wallabyPostprocessor = wallabyWebpack(webpackConfig);

  var babelCompiler = wallaby.compilers.babel({
    babel: babel,
    presets: ['react', 'es2015']
  });

  var appManifest = require(
    path.resolve('./src/.meteor/local/build/programs/web.browser/program.json')
  ).manifest;

  var meteorPackageFiles = appManifest.filter(function (file) {
    return file.type === 'js' && file.path.startsWith('packages/') &&
      [].indexOf(file.path) === -1;
  }).map(function (file) {
    var basePath ='src/.meteor/local/build/programs/web.browser';
    return {pattern: path.join(basePath, file.path)};
  });

  return {
    files: [
      'src/.meteor/local/build/programs/web.browser/merged-stylesheets.css',
      'src/imports/utility/testing/__meteor_runtime_config__.js'
    ].concat(
       meteorPackageFiles,
      [
        { pattern: 'src/imports/**/*.js', load: false },
        { pattern: 'src/imports/**/*.tests.@(js|jsx)', ignore: true },
        { pattern: 'src/imports/**/server/**/*.@(js|jsx)', ignore: true }
      ]
    ),
    tests: [
      { pattern: 'tests/**/*.tests.js', load: false },
      { pattern: 'tests/**/server/**/*.tests.js', ignore: true }
    ],
    compilers: {
      // Important: Make sure that src/.meteor/ is excluded from the pattern
      'src/imports/**/*.@(js|jsx)': babelCompiler,
      'tests/**/*.@(js|jsx)': babelCompiler,
    },
    postprocessor: wallabyPostprocessor,
    bootstrap: function () {
      window.__moduleBundler.loadTests();
    },
    testFramework: 'mocha',
    debug: false
  };
};
