module.exports = function(grunt) {
  grunt.initConfig({
    // Load package.json for config, etc.
    pkg: grunt.file.readJSON('package.json'),

    // Configuration for the jsbeautifier task
    jsbeautifier: {
      files: ["src/**/*.js", "src/**/*.css", "src/**/*.html"], // Files to beautify
      options: {
        js: {
          indentSize: 4
        },
        css: {
          indentSize: 4
        },
        html: {
          indentSize: 4
        }
      }
    },

    copy: {
      // You can define multiple targets for different copy operations
      assets: {
        files: [
          {
            expand: true,
            cwd: 'src/pic/',
            src: ['**/*'],
            dest: 'dist/pic/'
          },
          {
            expand: true,
            cwd: 'src/fonts/',
            src: ['**/*'],
            dest: 'dist/fonts/'
          },
          {
            src: 'src/favicon.ico',
            dest: 'dist/favicon.ico'
          }
        ]
      },
      i18n: {
        files: [
          {
            expand: true,
            cwd: 'src/i18n',
            src: ['*.properties'],
            dest: 'dist/i18n/'
          }
        ]
      }
    },

    uglify: {
      options: {
        // Options for UglifyJS, e.g., banner, sourceMap
      },
      build: {
        expand: true,
        cwd: 'src/js/',
        src: ['**/*.js'],
        dest: 'dist/js/'
      }
    },

    cssmin: {
      options: {
        // Options for clean-css, e.g., mergeIntoShorthands, roundingPrecision
      },
      build: {
        expand: true,
        cwd: 'src/css/',
        src: ['**/*.css'],
        dest: 'dist/css/'
      }
    },

    htmlmin: {
      options: {
        // Options for HTMLMinifier, e.g., removeComments, collapseWhitespace
        removeComments: false,
        collapseWhitespace: true
      },
      build: {
        files: [{
          expand: true,
          cwd: 'src', // Source HTML directory
          src: ['./**/*.html'], // HTML files to minify
          dest: 'dist' // Destination for minified HTML
        }]
      }
    }
  });

  // Load the task and register it
  grunt.loadNpmTasks('grunt-jsbeautifier');

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Register a default task to run all compression tasks
  grunt.registerTask('default', ['uglify', 'cssmin', 'htmlmin', 'copy:assets', 'copy:i18n']);
};