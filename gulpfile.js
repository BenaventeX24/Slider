const gulp = require("gulp");
const copy = require("gulp-copy");

// Define a task to copy the folder
gulp.task("copy-folder", function () {
  return gulp
    .src("./src/ChevronIcons/*.svg")
    .pipe(copy("dist", { prefix: 1 }))
    .pipe(gulp.dest("dist"));
});

// Create a default task that depends on the copy-folder task
gulp.task("default", gulp.series("copy-folder"));
