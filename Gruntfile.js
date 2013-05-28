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
      }
    },
    compass: {
      build: {                   // Target
        options: {              // Target options
          sassDir: 'styles',
          cssDir: 'build/css',
          environment: 'production',
          imagesDir: 'dist/img'
        }
      },
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'styles',
          cssDir: 'build/css',
          environment: 'production',
          httpImagesPath: 'http://opentok.github.io/codecademy-utils/img'
        }
      },
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
          {src: ['build/img/*'], dest: 'dist/img/', expand:true, flatten:true}
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
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/js/build_html.js' : [
            'build/js/handlebars.runtime.js',
            'build/js/templates.js',
            'build/js/internal-ui.css.js',
            'build/js/build_html.js'
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


  grunt.registerTask('default', ['clean:build', 'handlebars:build', 'compass:dist', 'css2js:build', 'copy:build']);
  grunt.registerTask('dist', ['default', 'clean:dist', 'uglify:dist', 'copy:dist']);
  grunt.registerTask('gh', ['dist', 'build_gh_pages:gh']);

};
