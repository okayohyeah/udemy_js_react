var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('default', () => {
  console.log('hello world');
});

// compile
// 'html' task
gulp.task('html', () => {
  // take in the index.hbs
  return gulp.src('index.hbs')
    .pipe(handlebars({}, {  // and passing in 'partials' directory and pushes it into the handlebars function
      batch: ['./partials']
    }))
    .pipe(rename({ //renaming the index.hbs to index.html
      extname: '.html'
    }))
    .pipe(gulp.dest('./')); // and putting all of it into root directory
});

// 'compress' task
gulp.task('compress', (cb) => {  // cb = callback; signals 'task' successes and failures and handles 
  pump([
    gulp.src('*.js'),
    uglify(),
    gulp.dest('dist')
    ],
    cb
  );
});