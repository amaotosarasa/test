'use strict';

let gulp = require('gulp');
let browsersync = require('browser-sync').create();
let sass = require('gulp-sass');
let header = require('gulp-header');
let replace = require('gulp-replace');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let csscomb = require('gulp-csscomb');

sass.compiler = require('node-sass');

// Sassファイル
gulp.task('sass', function () {
	return gulp.src('sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(replace(/@charset "UTF-8";/g, '')) // charsetの検索
		.pipe(header('@charset "UTF-8";\n\n'))　// charsetの挿入
		.pipe(postcss([
			autoprefixer({
			cascade: false
			})
		]))
		.pipe(csscomb())
		.pipe(gulp.dest('root/'));
});

// サーバーを立ち上げる
gulp.task('build-server', function (done) {
	browsersync.init({
		server: {
			baseDir: "root/"
		}
	});
	done();
	console.log('Server was launched');
});

// 監視ファイル
gulp.task('watch-files', function (done) {
	gulp.watch('root/**/*.html', gulp.task('browser-reload'));
	gulp.watch('root/**/*/*.css', gulp.task('browser-reload'));
	gulp.watch('root/**/*/*.js', gulp.task('browser-reload'));
	gulp.watch('sass/**/*.scss', gulp.task('sass'));
	done();
	console.log(('gulp watch started'));
});

// ブラウザのリロード
gulp.task('browser-reload', function (done) {
	browsersync.reload();
	done();
	console.log('Browser reload completed');
});

// タスクの実行
gulp.task('default', gulp.series('build-server', 'watch-files', 'sass',function (done) {
	done();
	console.log('Default all task done!');
}));