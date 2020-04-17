// Modules & Plugins
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var del = require('del');

const dirs = {
  src: 'src',
  dest: 'dest'
};

const stylesPaths = {
  src: dirs.src + '/css/*.css',
  dest: dirs.dest + '/css'
};

const scriptsPaths = {
  src: dirs.src + '/js/*.js',
  dest: dirs.dest + '/js'
};

const imagesPaths = {
  src: dirs.src + '/img/*',
  dest: dirs.dest + '/img'
};

// Styles Task
gulp.task('styles', function () {
     return gulp.src(stylesPaths.src)
        .pipe(gulp.dest(stylesPaths.dest))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    return gulp.src(dirs.src+'/*.html')
        .pipe(gulp.dest(dirs.dest))
        .pipe(browserSync.stream());
});

// Scripts Task
gulp.task('scripts', function() {
    return gulp.src(scriptsPaths.src)
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(scriptsPaths.dest))
        .pipe(browserSync.stream());
});

// Images Task
gulp.task('images', function() {
    return gulp.src(imagesPaths.src)
        .pipe(imagemin())
        .pipe(gulp.dest(imagesPaths.dest))
        .pipe(browserSync.stream());
});

gulp.task('clean', function(cb) {
  del([scriptsPaths.dest+'/*.js', stylesPaths.dest+'/*.css'], cb)
});

// Watch Task
gulp.task('watch', function() {
    browserSync.init({
      server: {
          baseDir: dirs.dest,
      },
      reloadDelay: 500,
      port: 8080
    });
    gulp.watch('dest/*.html').on('change', browserSync.reload);
    gulp.watch(stylesPaths.dest).on('change', browserSync.reload);
    gulp.watch(scriptsPaths.dest).on('change', browserSync.reload);
    gulp.watch(imagesPaths.src).on('change', browserSync.reload);

    gulp.watch('src/*.html', gulp.series('html'));
    gulp.watch(stylesPaths.src, gulp.series('styles'));
    gulp.watch(scriptsPaths.src, gulp.series('scripts'));
    gulp.watch(imagesPaths.src, gulp.series('images'));
});

// Default Task
gulp.task('default', gulp.parallel(['clean', 'html', 'styles', 'scripts', 'images', 'watch']));
gulp.task('build', gulp.parallel(['clean', 'html', 'scripts', 'styles', 'images']));
