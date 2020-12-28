var gulp = require('gulp');
var browsersync = require("browser-sync").create();

// サーバーを立ち上げる
gulp.task('build-server', function (done) {
	browsersync.init({
		server: {
			baseDir: "root/"
		}
	});
	done();
	console.log('Server was launched');
})

// 監視ファイル
gulp.task('watch-files', function (done) {
	gulp.watch("root/**/*.html", gulp.task('browser-reload'));
	gulp.watch("root/**/*/*.css", gulp.task('browser-reload'));
	gulp.watch("root/**/*/*.js", gulp.task('browser-reload'));
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
gulp.task('default', gulp.series('build-server', 'watch-files', function (done) {
	done();
	console.log('Default all task done!');
}));