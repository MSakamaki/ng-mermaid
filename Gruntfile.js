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
    extension: 'js',
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
    'uglify'
  ]);


  grunt.registerTask('serve', [
    'copy:example',
    'connect:livereload',
    'watch'
  ]);

};