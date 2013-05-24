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
    copy: {
      build: {
        files: [
          {src: ['scripts/*.js'], dest: 'build/js/', expand:true, flatten:true}
        ]
      }
    },
    clean: {
      build: ['build/js', 'build/css', 'build/img'],
      dist: ['dist/js', 'dist/css', 'dist/img']
    },
    uglify: {
      dist: {
        files: {
          'dist/js/build_html.js' : [
            'build/js/handlebars.runtime.js',
            'build/js/templates.js',
            'build/js/build_html.js'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  grunt.registerTask('default', ['clean:build', 'handlebars:build', 'copy:build']);
  grunt.registerTask('dist', ['default', 'clean:dist', 'uglify']);

};
