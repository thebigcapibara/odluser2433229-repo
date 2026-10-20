import gulp from 'gulp';
import { deleteAsync } from 'del';
import concat from 'gulp-concat';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import htmlReplace from 'gulp-html-replace';
import { exec } from 'node:child_process';

const DIST = 'dist';

// Wipe the previous build so nothing stale is carried forward.
export function clean() {
  return deleteAsync([DIST]);
}

// Bundle and minify the stylesheets into a single file.
export function styles() {
  return gulp
    .src(['public/css/reset.css', 'public/css/main.css'])
    .pipe(concat('app.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(`${DIST}/public/css`));
}

// Bundle and minify the browser scripts into a single file.
export function scripts() {
  return gulp
    .src('public/js/*.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(`${DIST}/public/js`));
}

// Copy the images across untouched.
export function images() {
  return gulp.src('public/images/**/*', { encoding: false }).pipe(gulp.dest(`${DIST}/public/images`));
}

// Point the templates at the bundled assets instead of the individual files.
export function views() {
  return gulp
    .src('views/**/*.html')
    .pipe(
      htmlReplace({
        css: 'css/app.min.css',
        js: 'js/app.min.js',
      })
    )
    .pipe(gulp.dest(`${DIST}/views`));
}

// The server, its data, the container definition, and the manifests the
// container build needs. package.json and package-lock.json have to travel
// with the build so `docker build` inside dist/ can install dependencies.
export function server() {
  return gulp
    .src(['app.js', 'Dockerfile', 'package.json', 'package-lock.json', 'data/**/*'], { base: '.' })
    .pipe(gulp.dest(DIST));
}

// Install the production dependencies inside dist/ so the built app can be
// run directly with `node dist/app.js`.
export function npmInstall(done) {
  exec('npm install --omit=dev', { cwd: DIST }, (err, stdout, stderr) => {
    if (stdout) {
      process.stdout.write(stdout);
    }
    if (stderr) {
      process.stderr.write(stderr);
    }
    done(err);
  });
}

export default gulp.series(
  clean,
  gulp.parallel(styles, scripts, images, views, server),
  npmInstall
);
