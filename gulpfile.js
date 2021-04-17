'use strict';

let gulp = require('gulp');

// ローカルサーバー
let browsersync = require('browser-sync').create();
let connectSSI   = require('connect-ssi');

// sass　/ css関連
let sass = require('gulp-sass');
let header = require('gulp-header');
let replace = require('gulp-replace');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let csscomb = require('gulp-csscomb');
let mqpacker = require('css-mqpacker');

sass.compiler = require('node-sass');

// 画像圧縮
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');

// Sassファイル
gulp.task('sass', function () {
	return gulp.src('sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'compac' // コメント削除のため圧縮形式で出力 cssconbでフォーマットは整形
		}).on('error', sass.logError))
		.pipe(replace(/@charset "UTF-8";/g, '')) // charsetの検索
		.pipe(header('@charset "UTF-8";\n\n')) // charsetの挿入
		.pipe(postcss([
			autoprefixer({
			cascade: false
			})
		]))
		.pipe(csscomb()) // CSS整形
		.pipe(postcss([mqpacker()])) // メディアクエリをまとめる
		.pipe(gulp.dest('root/'));
});

// サーバーを立ち上げる
gulp.task('build-server', function (done) {
	browsersync.init({
		server: {
			baseDir: "root/",
			middleware: [
				connectSSI({
					baseDir: __dirname + '/root/',
					ext: '.html'
				})
			]
		}
	});
	done();
	console.log('Server was launched');
});

// ブラウザのリロード
gulp.task('browser-reload', function (done) {
	browsersync.reload();
	done();
	console.log('Browser reload completed');
});

// 画像圧縮　タスク
var dir = 'originalImg/'
var changedDir = 'root/'
var distDir = 'root/'
gulp.task("imagemin", function () {
	return gulp
	.src(dir + '**/*.+(jpg|jpeg|JPG|png|PNG|gif|svg)')
	.pipe(changed(dir + '**/*.+(jpg|jpeg|JPG|png|PNG|gif|svg)'))
	.pipe(
		imagemin([
		pngquant({
			quality: [.60, .70], // 画質
			speed: 1 // スピード
		}),
		mozjpeg({ quality: 65 }), // 画質
		imagemin.svgo(),
		imagemin.optipng(),
		imagemin.gifsicle({ optimizationLevel: 3 }) // 圧縮率
		])
	)
	.pipe(gulp.dest(distDir));
});

// 監視ファイル
gulp.task('watch-files', function (done) {
	gulp.watch('root/**/*.html', gulp.task('browser-reload'));
	gulp.watch('root/**/*/*.css', gulp.task('browser-reload'));
	gulp.watch('root/**/*/*.js', gulp.task('browser-reload'));
	gulp.watch('sass/**/*.scss', gulp.task('sass'));
	gulp.watch('originalImg/**', gulp.task('imagemin'));
	done();
	console.log(('gulp watch started'));
});

// タスクの実行
gulp.task('default', gulp.series('build-server', 'watch-files', 'sass',function (done) {
	done();
	console.log('Default all task done!');
}));