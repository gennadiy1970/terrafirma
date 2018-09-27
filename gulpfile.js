const config = require('./config.json');
const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const handlebars = require('gulp-hb');
const browserSync = require('browser-sync').create();

gulp.task('javascript', () => gulp.src(`${config.paths.source}/javascript/**/*.js`)
	.pipe(sourcemaps.init())
	.pipe(concat('bundle.js'))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(`${config.paths.destination}/static`)));

gulp.task('sass', () => gulp.src(`${config.paths.source}/scss/**/base.scss`)
	.pipe(sass({
		includePaths: `${config.paths.source}/scss`,
		outputStyle: 'expanded',
	}).on('error', sass.logError))
	.pipe(sourcemaps.init())
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(concat('bundle.css'))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(`${config.paths.destination}/static`)));

gulp.task('handlebars', () => {
	const handlebarsStream = handlebars({
			debug: true
		})
		.partials(`${config.paths.source}/partials/**/*.hbs`)
		.helpers(`${config.paths.source}/helpers/**/*.js`)
		.data(`${config.paths.source}/data/**/*.{js,json}`);

	return gulp.src(`${config.paths.source}/pages/**/*.hbs`)
		.pipe(handlebarsStream)
		.pipe(rename(function(path) {
			path.extname = '.html';
		}))
		.pipe(gulp.dest(config.paths.destination));
});

gulp.task('serve', done => browserSync.init({
	open: config.browserSync.openOnStart,
	server: {
		host: config.browserSync.host,
		baseDir: config.browserSync.baseDir,
	}
}, () => done()));

gulp.task('copy:assets', () => gulp.src(`${config.paths.source}/assets/**/*.*`)
	.pipe(gulp.dest(`${config.paths.destination}/static`)));

gulp.task('delete:all', () => del(config.paths.destination));

let watchers = () => {

	gulp.watch(`${config.paths.source}/javascript/**/*.js`, {
		awaitWriteFinish: true,
	}).on('change', gulp.series('javascript', browserSync.reload));

	gulp.watch(`${config.paths.source}/scss/**/*.scss`, {
		awaitWriteFinish: true,
	}).on('change', gulp.series('sass', browserSync.reload));

	gulp.watch([
		`${config.paths.source}/pages/**/*.hbs`,
		`${config.paths.source}/partials/**/*.hbs`,
		`${config.paths.source}/data/**/*.{js,json}`], {
		awaitWriteFinish: true,
	}).on('change', gulp.series('handlebars', browserSync.reload));

	gulp.watch(`${config.paths.source}/assets/**/*.*`, gulp.series('copy:assets', browserSync.reload));

};

gulp.task('dev', gulp.series('delete:all', 'sass', 'javascript', 'handlebars', 'copy:assets', 'serve', [watchers]));
