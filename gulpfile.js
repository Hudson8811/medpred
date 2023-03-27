
let project_folder = require("path").basename(__dirname);
let source_folder = "#src";

let fs = require('fs');

let path = {
	build: {
		html: project_folder + "/",
		css: project_folder + "/css/",
		js: project_folder + "/js/",
		plugins: project_folder + "/plugins/",
		fonts: project_folder + "/fonts/",
		img: project_folder + "/img/",
	},
	src: {
		html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
		css: source_folder + "/scss/*.{scss,css}",
		js: source_folder + "/js/*.js",
		plugins: source_folder + "/plugins/**/*",
		fonts: source_folder + "/fonts/**/*",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
	},
	watch: {
		html: source_folder + "/**/*.html",
		css: source_folder + "/scss/**/*.scss",
		js: source_folder + "/js/**/*.js",
		plugins: source_folder + "/plugins/**/*",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
	},
	clean: "./" + project_folder + "/"
}

let { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require("browser-sync").create(),
	fileinclude = require("gulp-file-include"),
	del = require("del"),
	scss = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	group_media = require("gulp-group-css-media-queries"),
	clean_css = require("gulp-clean-css"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify-es").default,
	imagemin = require("gulp-imagemin")

function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: "./" + project_folder + "/"
		},
		port: 3000,
		notify: false
	})
}

function fonts() {
	return src(path.src.fonts)
		.pipe(dest(path.build.fonts))
		.pipe(browsersync.stream())
}
function plugins() {
	return src(path.src.plugins)
		.pipe(dest(path.build.plugins))
		.pipe(browsersync.stream())
}

function html() {
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function css() {
	return src(path.src.css)
		.pipe(dest(path.build.css))
		.pipe(
			scss({
				outputStyle: "expanded"
			})
		)
		.pipe(
			group_media()
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 5 versions"],
				cascade: true
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
		.pipe(clean_css())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))

}

function js() {
	return src(path.src.js)
		.pipe(dest(path.build.js))
		.pipe(
			uglify()
		)
		.pipe(
			rename({
				extname: ".min.js"
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

function images() {
	return src(path.src.img)
		// .pipe(
		// 	imagemin({
		// 		progressive: true,
		// 		svgoPlugins: [{ removeViewBox: false }],
		// 		interlaced: true,
		// 		optimizationLevel: 3 // 0 to 7
		// 	}) 
		// )
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}




function watchFiles(params) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.plugins], plugins);
	gulp.watch([path.watch.img], images);
}

function clean(params) {
	return del(path.clean);
}
// clean, 

let build = gulp.series(clean, gulp.parallel(html, css, js, images, plugins), fonts);
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.fonts = fonts;
exports.plugins = plugins;
exports.images = images;
exports.clean = clean;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
