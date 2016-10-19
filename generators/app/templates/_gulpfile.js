const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const apidoc = require('gulp-apidoc');

gulp.task('apidoc', done => {
  apidoc({
    src: 'controllers/',
    dest: 'public/docs/',
  }, done);
});

gulp.task('nodemon', () => {
  nodemon({
    script: 'server.js',
    ext: 'html js',
    ignore: ['ignored.js'],
  }).on('restart', () => {
    console.log('Nodemon: restarted!');
  });
});

gulp.task('default', ['dev']);
gulp.task('dev', ['nodemon']);
