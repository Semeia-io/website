const gulp = require("gulp");
const babel = require("gulp-babel");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const purgecss = require("gulp-purgecss");

function modernJS() {
 	return gulp.src("./dist/assets/js/app.js")
				.pipe(babel({
					presets: ["@babel/preset-env"],
					plugins: ["@babel/plugin-proposal-class-properties"]
				}))
				.pipe(uglify())
				.pipe(rename("app.min.js"))
				.pipe(gulp.dest("./dist/assets/js/"));
}

function purgeCSS() {
	return gulp
			.src("./dist/style.css")
			.pipe(purgecss({
				content: ["./dist/**/*.html"],
				safelist: ['open', 'active', 'dragging']
			}))
			.pipe(rename("style.min.css"))
			.pipe(gulp.dest("./dist"))
}

gulp.task("default", gulp.series(modernJS, purgeCSS));

