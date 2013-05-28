module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    handlebars: {
      build: {
        options: {
          namespace: "JST"
        },
        files: {
          "build/js/templates.js": ["templates/*.hbs"]
        }
      },
      dist: {
        options: {
          namespace: "JST"
        },
        files: {
          "dist/js/templates.js": ["templates/*.hbs"]
        }
      }
    },
    compass: {
      build: {                   // Target
        options: {              // Target options
          sassDir: 'styles',
          cssDir: 'build/css',
          environment: 'production',
          imagesDir: 'images'
        }
      },
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'styles',
          cssDir: 'dist/css',
          environment: 'production',
          httpImagesPath: 'http://opentok.github.io/codecademy-utils/img'
        }
      }
    },
    copy: {
      build: {
        files: [
          {src: ['scripts/*.js'], dest: 'build/js/', expand:true, flatten:true},
          {src: ['images/*'], dest: 'build/img/', expand:true, flatten:true}
        ]
      },
      dist: {
        files: [
          {src: ['scripts/*.js'], dest: 'dist/js/', expand:true, flatten:true},
          {src: ['images/*'], dest: 'dist/img/', expand:true, flatten:true}
        ]
      }
    },
    clean: {
      build: ['build/js', 'build/css', 'build/img'],
      dist: ['dist/js', 'dist/css', 'dist/img']
    },
    css2js: {
      build: {
        src: 'build/css/internal-ui.css',
        dest: 'build/js/internal-ui.css.js'
      },
      dist: {
        src: 'dist/css/internal-ui.css',
        dest: 'dist/js/internal-ui.css.js'
      }
    },
    uglify: {
      build: {
        options: {
          beautify: true,
          compress: false
        },
        files: {
          'build/js/main.js' : [
            'build/js/handlebars.runtime.js',
            'build/js/templates.js',
            'build/js/internal-ui.css.js',
            'build/js/build_html.js'
          ]
        }
      },
      dist: {
        files: {
          'dist/js/main.js' : [
            'dist/js/handlebars.runtime.js',
            'dist/js/templates.js',
            'dist/js/internal-ui.css.js',
            'dist/js/build_html.js'
          ]
        }
      }
    },
    build_gh_pages: {
      gh: {
        options: {
          exclude: ['node_modules', '.sass-cache']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-css2js');
  grunt.loadNpmTasks('grunt-build-gh-pages');


  grunt.registerTask('default', 'build');

  // build task puts the site together in the build directory
  // (using local url's and without any serious minfication)
  grunt.registerTask('build', ['clean:build', 'handlebars:build', 'compass:build',
                               'css2js:build', 'copy:build', 'uglify:build']);

  // dist task puts the site together in the dist directory
  grunt.registerTask('dist', ['clean:dist', 'handlebars:dist', 'compass:dist',
                              'css2js:dist', 'copy:dist', 'uglify:dist']);

  grunt.registerTask('gh', ['dist', 'build_gh_pages:gh']);

};
