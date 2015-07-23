// Modules & Plugins
var gulp = require('gulp');
var concat = require('gulp-concat');
var myth = require('gulp-myth');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect'); 
var livereload = require('gulp-livereload');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');

// Error Helper
function onError(err) {
    //beeper();
    console.log(err);
}

// Server Task
gulp.task('server', function() {
	connect.server({
	    root: 'server',
	    livereload: true
  	});
});

// Styles Task
gulp.task('styles', function() {
    return gulp.src('src/css/*.css')
        //.pipe(plumber({
        //    errorHandler: onError
        //}))
        .pipe(concat('all.css'))
        .pipe(myth())
        .pipe(gulp.dest('server/css'));
});

gulp.task('html', function () {
  	return gulp.src('src/*.html')
  		.pipe(gulp.dest('server'))
    	.pipe(connect.reload());
});

// Scripts Task
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('server/js'));
});

// Images Task
gulp.task('images', function() {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('server/img'));
});

// Clean Task
gulp.task('clean', function() {
    return gulp.src(['server/*.css', 'server/*.js'], {read: false})
        .pipe(clean());
});

// Watch Task
gulp.task('watch', function() {
	gulp.watch('src/*', ['html', 'styles', 'scripts', 'images']);
});

// Default Task
gulp.task('default', ['clean', 'html', 'styles', 'scripts', 'images', 'server', 'watch']);

