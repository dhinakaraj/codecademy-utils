var Handlebars={};!function(a,b){a.VERSION="1.0.0-rc.4",a.COMPILER_REVISION=3,a.REVISION_CHANGES={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:">= 1.0.0-rc.4"},a.helpers={},a.partials={};var c=Object.prototype.toString,d="[object Function]",e="[object Object]";a.registerHelper=function(b,d,f){if(c.call(b)===e){if(f||d)throw new a.Exception("Arg not supported with multiple helpers");a.Utils.extend(this.helpers,b)}else f&&(d.not=f),this.helpers[b]=d},a.registerPartial=function(b,d){c.call(b)===e?a.Utils.extend(this.partials,b):this.partials[b]=d},a.registerHelper("helperMissing",function(a){if(2===arguments.length)return b;throw new Error("Could not find property '"+a+"'")}),a.registerHelper("blockHelperMissing",function(b,e){var f=e.inverse||function(){},g=e.fn,h=c.call(b);return h===d&&(b=b.call(this)),b===!0?g(this):b===!1||null==b?f(this):"[object Array]"===h?b.length>0?a.helpers.each(b,e):f(this):g(b)}),a.K=function(){},a.createFrame=Object.create||function(b){a.K.prototype=b;var c=new a.K;return a.K.prototype=null,c},a.logger={DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,methodMap:{0:"debug",1:"info",2:"warn",3:"error"},log:function(b,c){if(a.logger.level<=b){var d=a.logger.methodMap[b];"undefined"!=typeof console&&console[d]&&console[d].call(console,c)}}},a.log=function(b,c){a.logger.log(b,c)},a.registerHelper("each",function(b,c){var d,e=c.fn,f=c.inverse,g=0,h="";if(c.data&&(d=a.createFrame(c.data)),b&&"object"==typeof b)if(b instanceof Array)for(var i=b.length;i>g;g++)d&&(d.index=g),h+=e(b[g],{data:d});else for(var j in b)b.hasOwnProperty(j)&&(d&&(d.key=j),h+=e(b[j],{data:d}),g++);return 0===g&&(h=f(this)),h}),a.registerHelper("if",function(b,e){var f=c.call(b);return f===d&&(b=b.call(this)),!b||a.Utils.isEmpty(b)?e.inverse(this):e.fn(this)}),a.registerHelper("unless",function(b,c){return a.helpers["if"].call(this,b,{fn:c.inverse,inverse:c.fn})}),a.registerHelper("with",function(b,c){return a.Utils.isEmpty(b)?void 0:c.fn(b)}),a.registerHelper("log",function(b,c){var d=c.data&&null!=c.data.level?parseInt(c.data.level,10):1;a.log(d,b)});var f=["description","fileName","lineNumber","message","name","number","stack"];a.Exception=function(){for(var a=Error.prototype.constructor.apply(this,arguments),b=0;b<f.length;b++)this[f[b]]=a[f[b]]},a.Exception.prototype=new Error,a.SafeString=function(a){this.string=a},a.SafeString.prototype.toString=function(){return this.string.toString()};var g={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},h=/[&<>"'`]/g,i=/[&<>"'`]/,j=function(a){return g[a]||"&amp;"};a.Utils={extend:function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])},escapeExpression:function(b){return b instanceof a.SafeString?b.toString():null==b||b===!1?"":(b=b.toString(),i.test(b)?b.replace(h,j):b)},isEmpty:function(a){return a||0===a?"[object Array]"===c.call(a)&&0===a.length?!0:!1:!0}},a.VM={template:function(b){var c={escapeExpression:a.Utils.escapeExpression,invokePartial:a.VM.invokePartial,programs:[],program:function(b,c,d){var e=this.programs[b];return d?e=a.VM.program(b,c,d):e||(e=this.programs[b]=a.VM.program(b,c)),e},programWithDepth:a.VM.programWithDepth,noop:a.VM.noop,compilerInfo:null};return function(d,e){e=e||{};var f=b.call(c,a,d,e.helpers,e.partials,e.data),g=c.compilerInfo||[],h=g[0]||1,i=a.COMPILER_REVISION;if(h!==i){if(i>h){var j=a.REVISION_CHANGES[i],k=a.REVISION_CHANGES[h];throw"Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+j+") or downgrade your runtime to an older version ("+k+")."}throw"Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+g[1]+")."}return f}},programWithDepth:function(a,b,c){var d=Array.prototype.slice.call(arguments,3),e=function(a,e){return e=e||{},b.apply(this,[a,e.data||c].concat(d))};return e.program=a,e.depth=d.length,e},program:function(a,b,c){var d=function(a,d){return d=d||{},b(a,d.data||c)};return d.program=a,d.depth=0,d},noop:function(){return""},invokePartial:function(c,d,e,f,g,h){var i={helpers:f,partials:g,data:h};if(c===b)throw new a.Exception("The partial "+d+" could not be found");if(c instanceof Function)return c(e,i);if(a.compile)return g[d]=a.compile(c,{data:h!==b}),g[d](e,i);throw new a.Exception("The partial "+d+" could not be compiled when running in runtime-only mode")}},a.template=a.VM.template}(Handlebars),this.JST=this.JST||{},this.JST["templates/internal-ui.hbs"]=Handlebars.template(function(a,b,c,d,e){return this.compilerInfo=[3,">= 1.0.0-rc.4"],c=c||a.helpers,e=e||{},'<!-- inside #internal-ui -->\n<header class="bar">\n  <div class="container">\n    <a class="logo" href="http://www.tokbox.com" target="_blank">OpenTok</a>\n    <p class="lesson-title">OpenTok Basics</p>\n    <!-- TODO: fancy tooltip hover -->\n    <nav class="links">\n      <a href="https://dashboard.tokbox.com" target="_blank" title="Sign up for your own API Key">Dashboard</a>\n      <a href="http://tokbox.com/opentok/webrtc/docs/js/reference/index.html" title="Read the full documentation">Docs</a>\n    </nav>\n  </div>\n</header>\n<div class="container">\n  <div class="output">\n  </div>\n</div>\n<!-- end #internal-ui -->\n'}),function(){var a='body{margin:0;font-size:14px}#internal-ui .logo{background-color:transparent;border:0;overflow:hidden;*text-indent:-9999px}#internal-ui .logo:before{content:"";display:block;width:0;height:150%}#internal-ui{font-family:"Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif}#internal-ui .logo,#internal-ui .links{position:absolute;top:0}#internal-ui .links a{text-decoration:none;display:inline-block;*display:inline;padding:4px 12px;margin-bottom:0;*margin-left:.3em;font-size:14px;line-height:20px;text-align:center;vertical-align:middle;cursor:pointer;background-repeat:repeat-x;*border:0;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ffffffff\', endColorstr=\'#ffe6e6e6\', GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);*zoom:1}#internal-ui .links a:hover,#internal-ui .links a:focus,#internal-ui .links a:active,#internal-ui .links a.active,#internal-ui .links a.disabled,#internal-ui .links a[disabled]{color:#333333;background-color:#e6e6e6;*background-color:#d9d9d9}#internal-ui .links a:active,#internal-ui .links a.active{background-color:#cccccc 9}#internal-ui .links a:first-child{*margin-left:0}#internal-ui .links a:hover,#internal-ui .links a:focus{color:#333333;text-decoration:none;background-position:0 -15px;-webkit-transition:background-position 0.1s linear;-moz-transition:background-position 0.1s linear;-o-transition:background-position 0.1s linear;transition:background-position 0.1s linear}#internal-ui .links a:focus{outline:thin dotted #333;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}#internal-ui .links a.active,#internal-ui .links a:active{background-image:none;outline:0;-webkit-box-shadow:inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05);-moz-box-shadow:inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05);box-shadow:inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05)}#internal-ui .links a.disabled,#internal-ui .links a[disabled]{cursor:default;background-image:none;opacity:0.65;filter:alpha(opacity=65);-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none}#internal-ui p{margin:0}#internal-ui .bar{background:#3c859b;color:white;font-size:1.5em;padding:0.8em 0;text-align:center;-webkit-box-shadow:0px 0px 5px #333;-moz-box-shadow:0px 0px 5px #333;box-shadow:0px 0px 5px #333;margin-bottom:1em}#internal-ui .container{width:800px;margin:0 auto;position:relative}@media screen and (max-width: 800px){#internal-ui .container{width:auto}}#internal-ui .logo{top:-8px;left:10px;width:130px;height:42px;background:url(\'http://opentok.github.io/codecademy-utils/img/logo.png?1369768331\')}#internal-ui .links{right:10px}#internal-ui .links a{background-color:#24748f !important;background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#2d95b7", endColorstr="#23748e");background-image:-khtml-gradient(linear, left top, left bottom, from(#2d95b7), to(#23748e));background-image:-moz-linear-gradient(top, #2d95b7, #23748e);background-image:-ms-linear-gradient(top, #2d95b7, #23748e);background-image:-webkit-gradient(linear, left top, left bottom, color-stop(0%, #2d95b7), color-stop(100%, #23748e));background-image:-webkit-linear-gradient(top, #2d95b7, #23748e);background-image:-o-linear-gradient(top, #2d95b7, #23748e);background-image:linear-gradient(#2d95b7,#23748e);border:1px solid;border-color:#23748e #23748e #216c85;color:#fff !important;text-shadow:0 -1px 0 rgba(0,0,0,0.16);-webkit-font-smoothing:antialiased}@media screen and (max-width: 576px){#internal-ui .lesson-title{display:none}#internal-ui .bar{height:1.2em}}#internal-ui .output{background:#ccc;border:1px solid #999;padding:5px;border-radius:3px;margin-top:1em}#internal-ui .output.error{color:#a33;background:#fcc;border-color:#a66}\n\n',b=document.createElement("style");if(document.getElementsByTagName("head")[0].appendChild(b),b.styleSheet)b.styleSheet.disabled||(b.styleSheet.cssText=a);else try{b.innerHTML=a}catch(c){b.innerText=a}}(),$(document).ready(function(){var a=window.JST["templates/internal-ui.hbs"];$("#internal-ui").html(a({}))});