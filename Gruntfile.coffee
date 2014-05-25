module.exports = (grunt) ->

  grunt.initConfig

    watch:
      less:
        files: ['src/style/**/*.less']
        tasks: ['style']
      coffee:
        files: ['src/**/*.coffee']
        tasks: ['compile']

  # Scripts tasks --------------------------------------------->
    coffee:
      options:
        bare: yes
        sourceMap: no
      compile:
        expand: yes
        cwd: 'src'
        src: ['**/*.coffee']
        dest: 'build'
        ext: '.js'


    browserify:
      options:
        debug: yes
      build:
        files:
          'dist/js/app.js': 'build/js/app.js'
      test:
        options:
          debug: no
        files:
          'test/unit/js/specs.js':'build/specs/MainSpec.js'



    bower_concat:
      vendors:
        dest: 'dist/js/vendors.js'
        exclude: ['webapps-jasmine2', 'bootstrap']
        dependencies:
          'backbone': 'underscore'

    uglify:
      vendors:
        src: 'dist/js/vendors.js'
        dest: 'dist/js/vendors.js'


  # Stylesheets tasks ----------------------------------------->
    less:
      compile:
        options:
          compress: yes
        files:
          'dist/css/app.css' : ['src/style/app.less']


  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-bower-concat'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-newer'



  # Default task.
  grunt.registerTask 'default', 'the default grunt task', ['scripts', 'style']
  grunt.registerTask 'scripts', 'tasks related to javascript files', ['newer:coffee:compile', 'browserify',  'bower_concat:vendors']
  grunt.registerTask 'compile', ['newer:coffee:compile', 'browserify']
  grunt.registerTask 'style', 'tasks related to css files', ['less:compile']