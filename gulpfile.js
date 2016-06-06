var gulp = require('gulp'),
	rimraf = require('rimraf'),
	usemin = require('gulp-usemin'),
	imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
	minifyHtml = require('gulp-minify-html'),
	minifyCss = require('gulp-minify-css'),
	refresh = require('gulp-livereload'),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint'),
	express = require('express'),
	bodyParser = require('body-parser'),
	lr = require('tiny-lr'),
	open = require('open'),
	server = lr(),
	NwBuilder = require('nw-builder');

// source folders
var src = {
	folder: './src',
	css: 'src/css/**',
	font: 'src/font/**',
	img: 'src/img/**/*.*',
	js: 'src/js/**',
	media: 'src/media/**',
	videos: 'src/videos/**',
	data: 'src/data/**',
	index: 'src/*.html'
};

// destination folders
var dest = {
	folder: './dist',
	css: 'dist/css',
	font: 'dist/font',
	img: 'dist/img',
	js: 'dist/js',
	media: 'dist/media',
	videos: 'dist/videos',
	data: 'dist/data',
};

// start a dev server
gulp.task('server', function() {
	var app = express();
	app.use(express.static(src.folder));
	app.use('/bower_components', express.static(__dirname + '/bower_components'));
	app.use(bodyParser());
	app.listen(8080, function() {
		gutil.log('Listening on 8080');
	});
});

// open the default browser on the dev server
gulp.task('open', function() {
	open('http://localhost:8080/');
});

// copy datas
gulp.task('data', function() {
	gulp.src(src.data)
	.pipe(gulp.dest(dest.data))
	.pipe(refresh(server));
});

// copy medias
gulp.task('css', function() {
	gulp.src(src.css)
	.pipe(refresh(server));
});

// copy medias
gulp.task('media', function() {
	gulp.src(src.media)
	.pipe(gulp.dest(dest.media));
	// .pipe(refresh(server));
});

// copy medias
gulp.task('videos', function() {
	gulp.src(src.videos)
	.pipe(gulp.dest(dest.videos));
	// .pipe(refresh(server));
});

// copy font
gulp.task('font', function() {
	gulp.src(src.font)
	.pipe(gulp.dest(dest.font));
	// .pipe(refresh(server));
});

// minify css, js, html
gulp.task('usemin', function() {
	gulp.src(src.index)
		.pipe(usemin({
			//css: [minifyCss(), 'concat'],
			html: [minifyHtml({
				empty: true
			})],
			vendor: [uglify()],
			app: [uglify()]
		}))
		.pipe(gulp.dest(dest.folder))
		.pipe(refresh(server));
});



// minify images
gulp.task('img', function() {
	gulp.src(src.img)
	.pipe(imagemin())
	.pipe(gulp.dest(dest.img));
	// .pipe(refresh(server));
});


// copy videos
gulp.task('videos', function() {
	gulp.src(src.videos)
	.pipe(gulp.dest(dest.videos));
	// .pipe(refresh(server));
});



// livereload server
gulp.task('livereload', function() {
	server.listen(35729, function(err) {
		if (err) return gutil.log(gutil.colors.bold.red(err));
	});
});

// jshint
gulp.task('lint', function() {
	gulp.src(src.js)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// default task : run with 'gulp'
gulp.task('default', function() {
	// delete dist folder and rebuild it
	rimraf(dest.folder, function() {
		gulp.start('server', 'livereload', 'open', 'data', 'media', 'videos', 'img', 'font', 'usemin');
	});

	// watch assets, and if they change rebuild them
	gulp.watch(src.font, ['font']);
	gulp.watch(src.data, ['data']);
	gulp.watch(src.media, ['media']);
	gulp.watch(src.js, ['usemin']);
	gulp.watch(src.css, ['usemin']);
	gulp.watch(src.index, ['usemin']);
	gulp.watch(src.img, ['img']);
	gulp.watch(src.videos, ['videos']);
});

// task for Showpad version - without video folder : run with 'gulp prepare_showpad'
gulp.task('prepare_showpad', function() {
	// delete dist folder and rebuild it
	rimraf(dest.folder, function() {
		gulp.start('server', 'livereload', 'open', 'data', 'media', 'img', 'font', 'usemin');
	});

	// watch assets, and if they change rebuild them
	gulp.watch(src.font, ['font']);
	gulp.watch(src.data, ['data']);
	gulp.watch(src.media, ['media']);
	gulp.watch(src.js, ['usemin']);
	gulp.watch(src.css, ['usemin']);
	gulp.watch(src.index, ['usemin']);
	gulp.watch(src.img, ['img']);
});



gulp.task('prepare', function() {
	// delete dist folder and rebuild it
	rimraf(dest.folder, function() {
		rimraf('webkitbuilds', function() {
			gulp.start('data', 'media', 'videos', 'img', 'font', 'usemin');
		});
	});
});


gulp.task('nw', function() {

	var nw = new NwBuilder({
		files: [dest.folder + '/**/*', 'package.json'],
		platforms: ['osx64','win32', 'win64'],
		version: 'v0.11.0',
		buildDir: './webkitbuilds'
		// platforms: ['osx32', 'osx64', 'win32', 'win64']
	});
	//Log stuff you want 
	nw.on('log', console.log);
	// Build returns a promise 
	nw.build().then(function() {
		console.log('all done!');
	}).catch(function(error) {
		console.error(error);
	});

});
