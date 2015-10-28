module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
          src: 'build/js/scripts/*.js',
          dest: 'build/js/script.js'
      },
			push: {
          src: 'build/js/script.js',
  				dest: 'www/js/script.js',
			}
    },

    sass: {
      dist: {
        options: { style: 'compressed' },
        files: { '.tmp/style.css': 'build/scss/style.scss' }
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')(),
          require('lost')
        ]
      },
      dist: {
        src: '.tmp/style.css',
        dest: 'www/css/style.css'
      }
    },

    watch: {
      frontend: {
        options: { livereload: true, },
        files: [
          'www/css/*.css',
          'www/js/*.js',
          'www/index.html'
        ]
      },

      sass: {
        files: [
          'build/scss/globals/*.scss',
          'build/scss/partials/*.scss',
        ],
        tasks: 'sass'
      },

      css: {
        files: ['.tmp/*.css'],
        tasks: 'postcss'
      },

      js: {
        files: [ 'build/js/scripts/*.js' ],
        tasks: 'concat'
      }
    }
  });


  // 2. Where we tell Grunt we plan to use these plug-ins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');

  // 3. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['sass', 'postcss', 'concat', 'watch']);

};
