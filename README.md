# Codecademy Utils

Scripts that support the [OpenTok lesson](#) on Codecademy

# Building

This project is built using [Grunt](http://gruntjs.com).

## grunt build

Running this command populates the `build` directory with JS, CSS, and images. They come
from the following:

*  `scripts` => `build/js`: script files that most likely have a counterpart in the `dist`
   directory and will directly be included onto a page

*  `styles` => `build/css`: scss files that will be compiled with Sass and possibly eventually
   turned into inlined stylesheets on specific pages

*  `templates` => `build/js`: Handlebars templates that are compiled to functions that are
   attached to the JST global, intended to be used by the `srcipts`.

## grunt dist

Running this command populates the `dist` directory with ugified versions of the output from
`grunt build`.

## grunt gh



## Test Pages

*  `test_page.html`: just a blank page set up to run `dist/js/build_html.js`

