/* eslint-env node */
'use strict';

const fastbootTransform = require('fastboot-transform');

module.exports = {
    name: 'ember-summernote-lite',
    options: {
      nodeAssets: {
        summernote: {
          srcDir: 'dist',
          destDir: 'assets',
          import: [
            'summernote-lite.css',
            'summernote-lite.js',
            'font/summernote.eot',
            'font/summernote.ttf',
            'font/summernote.woff'
          ],
          processTree(input) {
           return fastbootTransform(input);
          }
        }
      }
    }
  };
