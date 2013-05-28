this["JST"] = this["JST"] || {};

this["JST"]["templates/internal-ui.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<!-- inside #internal-ui -->\n<header class=\"bar\">\n  <div class=\"container\">\n    <a class=\"logo\" href=\"http://www.tokbox.com\" target=\"_blank\">OpenTok</a>\n    <p class=\"lesson-title\">OpenTok Basics</p>\n    <!-- TODO: fancy tooltip hover -->\n    <nav class=\"links\">\n      <a href=\"https://dashboard.tokbox.com\" target=\"_blank\" title=\"Sign up for your own API Key\">Dashboard</a>\n      <a href=\"http://tokbox.com/opentok/webrtc/docs/js/reference/index.html\" title=\"Read the full documentation\">Docs</a>\n    </nav>\n  </div>\n</header>\n<div class=\"container\">\n</div>\n<!-- end #internal-ui -->\n";
  });