'use strict'

//var semver = require('semver');

module.exports = function (grunt) {

  //mountFolder = (connect, dir) - >
  //connect.static require('path').resolve(dir)

  require('load-grunt-tasks')(grunt);

  var yeomanConfig = {
    app: 'examples',
    src: 'src',
    dist: 'dist',
    bower: 'source',
    extension: '{js,css}',
  };

  grunt.initConfig({
    yeoman: yeomanConfig,

    // Watches files for changes and runs tasks based on the changed files
    // Add it to coffee if needed;
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,**/}*.html',
          '<%= yeoman.app %>/{,**/}*.css',
          '<%= yeoman.src %>/{,**/}*.js'
        ],
        tasks: ['copy:example']
      }
    },

    connect: {
      options: {
        port: 9000,
        hostname: "localhost",
        livereload: 9001
      },
      livereload: {
        options: {
          open: 'http://localhost:<%= connect.options.port%>',
          base: '<%= yeoman.app %>'
        }
      }
    },

    'gh-pages': {
      options: {
        base: 'examples'
      },
      src: ['**']
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.src %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '{,**/}*.<%= yeoman.extension %>'
          ]
        }]
      },
      example:{
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.src %>',
          dest: '<%= yeoman.app %>',
          src: [
            '{,**/}*.<%= yeoman.extension %>'
          ]
        }]
      },
      bower: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.bower %>',
          dest: '<%= yeoman.app %>/lib',
          src: [
            '{,**/}*.<%= yeoman.extension %>'
          ]
        }]
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/ngmermaid.min.js': ['<%= yeoman.dist %>/*.js']
        }
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

  });

  grunt.registerTask('default', [
    'karma:unit',
    'copy:dist',
    //'uglify'
  ]);

  grunt.registerTask('ghpage', [
    'karma:unit',
    'copy:dist',
    'copy:example',
    'copy:bower',
    'gh-pages'
  ]);

  grunt.registerTask('serve', [
    'copy:example',
    'copy:bower',
    'connect:livereload',
    'watch'
  ]);

};