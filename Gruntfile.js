module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    useminPrepare: {
      html: 'client/index.html',
      options: {
        dest: 'client/build'
      }
    },
    // uncss: {
    //   dist: {
    //     files: {
    //       'client/build/css/app.css': ['client/**/*.html']
    //     }
    //   }
    // },
    copy: {
      main: {
        src: 'client/index.html',
        dest: 'client/build/index.html'
      },
      font: {
        expand: true,
        flatten: true,
        dest: 'client/build/fonts/',
        src: 'client/assets/fonts/*'
      }
    },
    usemin: {
      html: 'client/build/index.html'
    },
    clean: {
      build: ['client/build'],
      tmp: ['.tmp']
    }
  });


  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-usemin');
  // grunt.loadNpmTasks('grunt-uncss');

  grunt.registerTask('build', [
    'clean:build',
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'copy:main',
    'copy:font',
    'usemin',
    'clean:tmp'
    // 'uncss'
  ]);

  grunt.registerTask('default', ['build']);

};
