const gulp    = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    ext: 'html js',
    ignore: ['ignored.js']
  }).on('restart', function() {
    console.log('Nodemon: restarted!');
  });
});

gulp.task('default', ['nodemon']);
gulp.task('dev', ['nodemon']);
