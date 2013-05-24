/*
 * build_html.js
 *
 * Codecademy 'Web' style lessons display the `index.html` page as the result when the student clicks on 'Submit'. The
 * SCT runs after the page is loaded. In order to run our async tests in the SCT, this scripts assembles a UI in that
 * page which provides a button to run the tests and an element to display the results.
 *
 * Props to https://github.com/Mattieuga/test
 *
 * Dependencies: jQuery
 */

// Page is really tiny, so this should fire almost immediately
$(document).ready(function() {
  var internalUiTemplate = window.JST["templates/internal-ui.hbs"];
  $('#internal-ui').html(internalUiTemplate({}));
});

