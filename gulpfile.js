const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const svgSprite = require('gulp-svg-sprite');

// Configuração do sprite de ícones
const config = {
  mode: {
    symbol: {
      dest: 'sprite',
      sprite: 'sprite.svg',
      example: true,
    },
  },
  svg: {
    xmlDeclaration: false,
    doctypeDeclaration: false,
  },
};

// Tarefa para build dos ícones
gulp.task('build:icons', () => {
  return gulp
    .src('nodes/**/*.svg')
    .pipe(svgmin())
    .pipe(cheerio({
      run: ($) => {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true },
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite(config))
    .pipe(gulp.dest('dist'));
});

// Tarefa padrão
gulp.task('default', gulp.series('build:icons')); 