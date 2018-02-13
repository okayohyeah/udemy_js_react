module.exports = function(grunt) {
  // basis of entire Grunt File

  // create initial configuration
    // pass in name here instead of in command line
  grunt.initConfig({
    name: 'class',
    watch: {                    // add 'watch'
      files: ['*.js', '*.css'], // watch all(= *) js and css files
      task: ['updated']         // create updated task
    },
    uglify: {                   // add 'uglify'
      build: {                  // in 'build' parameter
        src: ['index.js', 'logger.js'], // add 'src' files
        dest: 'dist/bundle.js'   // add 'destination' file into new folder
      }
    },
    babel: {                    // add 'babel'
      options: {
        sourceMap: true,
        presets: ['env']
      },
      dist: {
        files: [
          {
            expand: true,
            src: ['index.js', 'logger.js'],
            dest: 'dist/',     // if you want the modified files to go into another dir
            ext: '-modified.js' 
          }
        ]
      }
    }
  });

  // load "watching" into grunt
  grunt.loadNpmTasks('grunt-contrib-watch');

  // load "uglifying" into grunt
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // load "babeling" into grunt
  grunt.loadNpmTasks('grunt-babel');

  // create "updated" task
  grunt.registerTask('updated', () => {
    grunt.log.writeln(`It updated again!`);
  });

  // create task called 'default'
  grunt.registerTask('default', () => {
    grunt.log.writeln(`Hello, ${grunt.config.get('name')}`);
  });
}