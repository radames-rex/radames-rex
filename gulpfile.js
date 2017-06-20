'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  clean = require('gulp-concat'),
  server = require('gulp-server-livereload'),
  port = 8080;

// Compila Sass para Css
gulp.task('sass', function() {
  return gulp.src([
      'stylesheets/sass/reset.scss',
      'stylesheets/sass/layout.scss',
      'stylesheets/sass/fonts.scss',
      'stylesheets/sass/header.scss',
      'stylesheets/sass/**/*.scss',
      'stylesheets/sass/footer.scss'
    ])
    .pipe(concat('app.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('stylesheets/'));
});

// Gera um build para deploy no servidor
gulp.task('build', function() {
  return gulp.src([
      '../radames-rex/**',
      '!../radames-rex/.temp/',
      '!../radames-rex/stylesheets/sass',
      '!../radames-rex/**/DS.Store'
    ])
    .pipe(gulp.dest('dist/'));
});

// Observa mudanças para fazer reload
gulp.task('watch', function() {
  gulp.watch('stylesheets/sass/**/*.scss', ['sass']);
});

// Inicia o servidor
gulp.task('default', ['watch'], function() {
  gulp.src('../radames-rex')
    .pipe(server({
      livereload: true,
      open: true,
      port: port
    }));
});
