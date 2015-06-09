var gulp      = require('gulp');
var nodemon   = require('gulp-nodemon');

gulp.task('develop', function () {

  nodemon({
    script: 'server.js',
    ext: 'html js',
    ignore: ['ignored.js']
  }).on('restart', function () {
    console.log('Nodemon: restarted!');
  });

});

gulp.task('default', ['develop']);