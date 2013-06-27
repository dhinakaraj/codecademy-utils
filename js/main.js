!function(){var a='#testing{border-radius:5px;background:#aac;border:1px solid #666;padding:10px 20px;color:#333}#testing ul{list-style:none}#testing li{position:relative;list-style:none;margin-left:2em}#testing .icon{position:absolute;top:0;left:-25px;height:20px;width:20px;color:#333}#testing .pass .icon:after{color:green;content:"\\2713"}#testing .fail .icon:after{color:red;content:"\\2717"}#testing .fail-reason{margin-left:2em;color:red}\n\n',b=document.createElement("style");if(document.getElementsByTagName("head")[0].appendChild(b),b.styleSheet)b.styleSheet.disabled||(b.styleSheet.cssText=a);else try{b.innerHTML=a}catch(c){b.innerText=a}}(),function(a,b){"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.Spinner=b()}(this,function(){"use strict";function a(a,b){var c,d=document.createElement(a||"div");for(c in b)d[c]=b[c];return d}function b(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function c(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+100*(c/d),g=Math.max(1-(1-a)/b*(100-f),a),h=j.substring(0,j.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return l[e]||(m.insertRule("@"+i+"keyframes "+e+"{"+"0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+g+"}"+"}",m.cssRules.length),l[e]=1),e}function d(a,b){var c,d,e=a.style;if(void 0!==e[b])return b;for(b=b.charAt(0).toUpperCase()+b.slice(1),d=0;d<k.length;d++)if(c=k[d]+b,void 0!==e[c])return c}function e(a,b){for(var c in b)a.style[d(a,c)||c]=b[c];return a}function f(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)void 0===a[d]&&(a[d]=c[d])}return a}function g(a){for(var b={x:a.offsetLeft,y:a.offsetTop};a=a.offsetParent;)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}function h(a){return"undefined"==typeof this?new h(a):(this.opts=f(a||{},h.defaults,n),void 0)}function i(){function c(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}m.addRule(".spin-vml","behavior:url(#default#VML)"),h.prototype.lines=function(a,d){function f(){return e(c("group",{coordsize:j+" "+j,coordorigin:-i+" "+-i}),{width:j,height:j})}function g(a,g,h){b(l,b(e(f(),{rotation:360/d.lines*a+"deg",left:~~g}),b(e(c("roundrect",{arcsize:d.corners}),{width:i,height:d.width,left:d.radius,top:-d.width>>1,filter:h}),c("fill",{color:d.color,opacity:d.opacity}),c("stroke",{opacity:0}))))}var h,i=d.length+d.width,j=2*i,k=2*-(d.width+d.length)+"px",l=e(f(),{position:"absolute",top:k,left:k});if(d.shadow)for(h=1;h<=d.lines;h++)g(h,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(h=1;h<=d.lines;h++)g(h);return b(a,l)},h.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var j,k=["webkit","Moz","ms","O"],l={},m=function(){var c=a("style",{type:"text/css"});return b(document.getElementsByTagName("head")[0],c),c.sheet||c.styleSheet}(),n={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"};h.defaults={},f(h.prototype,{spin:function(b){this.stop();var c,d,f=this,h=f.opts,i=f.el=e(a(0,{className:h.className}),{position:h.position,width:0,zIndex:h.zIndex}),k=h.radius+h.length+h.width;if(b&&(b.insertBefore(i,b.firstChild||null),d=g(b),c=g(i),e(i,{left:("auto"==h.left?d.x-c.x+(b.offsetWidth>>1):parseInt(h.left,10)+k)+"px",top:("auto"==h.top?d.y-c.y+(b.offsetHeight>>1):parseInt(h.top,10)+k)+"px"})),i.setAttribute("role","progressbar"),f.lines(i,f.opts),!j){var l,m=0,n=(h.lines-1)*(1-h.direction)/2,o=h.fps,p=o/h.speed,q=(1-h.opacity)/(p*h.trail/100),r=p/h.lines;!function s(){m++;for(var a=0;a<h.lines;a++)l=Math.max(1-(m+(h.lines-a)*r)%p*q,h.opacity),f.opacity(i,a*h.direction+n,l,h);f.timeout=f.el&&setTimeout(s,~~(1e3/o))}()}return f},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=void 0),this},lines:function(d,f){function g(b,c){return e(a(),{position:"absolute",width:f.length+f.width+"px",height:f.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/f.lines*i+f.rotate)+"deg) translate("+f.radius+"px"+",0)",borderRadius:(f.corners*f.width>>1)+"px"})}for(var h,i=0,k=(f.lines-1)*(1-f.direction)/2;i<f.lines;i++)h=e(a(),{position:"absolute",top:1+~(f.width/2)+"px",transform:f.hwaccel?"translate3d(0,0,0)":"",opacity:f.opacity,animation:j&&c(f.opacity,f.trail,k+i*f.direction,f.lines)+" "+1/f.speed+"s linear infinite"}),f.shadow&&b(h,e(g("#000","0 0 4px #000"),{top:"2px"})),b(d,b(h,g(f.color,"0 0 1px rgba(0,0,0,.1)")));return d},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}});var o=e(a("group"),{behavior:"url(#default#VML)"});return!d(o,"transform")&&o.adj?i():j=d(o,"animation"),h}),function(a){if("object"==typeof exports)a(require("jquery"),require("spin"));else if("function"==typeof define&&define.amd)define(["jquery","spin"],a);else{if(!window.Spinner)throw new Error("Spin.js not present");a(window.jQuery,window.Spinner)}}(function(a,b){a.fn.spin=function(c,d){return this.each(function(){var e=a(this),f=e.data();f.spinner&&(f.spinner.stop(),delete f.spinner),c!==!1&&(c=a.extend({color:d||e.css("color")},a.fn.spin.presets[c]||c),f.spinner=new b(c).spin(this))})},a.fn.spin.presets={tiny:{lines:8,length:2,width:2,radius:3},small:{lines:8,length:4,width:3,radius:5},large:{lines:10,length:8,width:4,radius:8}}});var AsyncTest={logger:!0,internalEvent:"opentok_async_test_event",waitEvents:[],forceFailEvent:"opentok_async_fail_event",resultsText:"All done!",timeout:1e4,waitOn:function(a){this.waitEvents.push(a),this.logger&&console.log("Will wait on event "+a)},setTest:function(a){setTimeout(function(){a()},1)},startWaiting:function(){var a=this;this.waitEvents.length>0?(this.logger&&console.log("Waiting on "+this.waitEvents.length+" events"),$expect(window).on(this.internalEvent,function(b,c,d,e){if(a.logger&&console.log("Event '"+c+"' triggered with: "+d+", "+e),!d&&-1!=a.waitEvents.indexOf(c)||b===a.forceFailEvent)a.logger&&console.log("Event "+c+" failed!"),$expect("html").to.be.empty(e);else{var f=$.inArray(c,a.waitEvents);f>=0&&a.waitEvents.splice(f,1),a.startWaiting()}})):this.logger&&console.log("All events triggered!")},triggerEvent:function(a,b,c){"undefined"==typeof c&&(c=""),console.log("triggering event "+a+" with passed: "+(b?"true":"false")),console.log("this is:"),console.log(this),$(window).trigger(this.internalEvent,[a,b,c])},fail:function(a){"nil"==typeof a&&(a="Looks like something went wrong on our end. Try reloading the page."),$(window).trigger(this.internalEvent,[this.forceFailEvent,!1,a])},addTest:function(a,b,c,d){$('<li id="'+a+'"><span class="icon"></span><p class="display-name">'+b+"</p></li>").appendTo("#testing"),this.waitOn(a),(c||d)&&setTimeout(function(){c?-1!=AsyncTest.waitEvents.indexOf(a)&&AsyncTest.failTest(a,"The test "+a+" was not completed"):AsyncTest.passTest(a)},this.timeout)},passTest:function(a){$("#"+a).attr("class",""),$("#"+a).addClass("pass"),AsyncTest.updateUI(),AsyncTest.triggerEvent(a,!0)},failTest:function(a,b){$("#"+a).attr("class",""),$("#"+a).addClass("fail"),$('<p class="fail-reason">'+b+"</p>").appendTo("#"+a),AsyncTest.updateUI(),AsyncTest.triggerEvent(a,!1,b)},init:function(){$('<div id="testing"><h4>Test Results</h4><ul></ul></div>').appendTo("body"),AsyncTest.updateUI()},updateUI:function(){$("#testing .icon").spin("tiny"),$("#testing .pass .icon").spin(!1),$("#testing .fail .icon").spin(!1)},instrument:function(){function a(a){var b=[];console.log("instrumenting session");var c=$.proxy(a.addEventListener,a);a.addEventListener=function(a,b){"sessionConnected"===a&&"sessionConnectedHandler"==b.name&&AsyncTest.passTest("sessionConnectedHandler"),"streamCreated"===a&&"streamCreatedHandler"==b.name&&AsyncTest.passTest("streamCreatedHandler"),c(a,b)};var d=$.proxy(a.connect,a);a.connect=function(a,b){return"string"!=typeof a&&"number"!=typeof a?(AsyncTest.failTest("sessionConnected","You passed in an invalid apiKey parameter to session.connect(). This parameter must be a String."),void 0):"string"!=typeof b?(AsyncTest.failTest("sessionConnected","You passed in an invalid token parameter to session.connect(). This parameter must be a String."),void 0):(d(a,b),void 0)};var e=$.proxy(a.subscribe,a);a.subscribe=function(c,d){if("object"!=typeof c&&"string"!=typeof c.streamId)return AsyncTest.failTest("subscribeToStreams","You passed in an invalid stream parameter to session.subscribe(). This parameter must be a Stream."),void 0;if("string"!=typeof d)return AsyncTest.failTest("subscribeToStreams","You passed in an invalid replacementElementId parameter to session.subscribe(). This parameter must be a String."),void 0;if(c.connection.connectionId==a.connection.connectionId)return AsyncTest.failTest("excludeOwnStream","You tried to subscribe to your own stream. Exclude it using the condition described."),void 0;AsyncTest.passTest("subscribeOtherStream");var f=b.indexOf(c.streamId);return-1==f?console.log("impossible! could not find "+c.streamId):b.splice(f,1),e(c,d)},a.addEventListener("sessionConnected",function(){AsyncTest.passTest("sessionConnected")}),a.addEventListener("streamCreated",function(c){console.log("stream created internal handler"),c.streams.forEach(function(c){c.connection.connectionId==a.connection.connectionId?AsyncTest.passTest("publishedStream"):(b.push(c.streamId),console.log("pushed streamId "+c.streamId))}),setTimeout(function(){0!=b.length&&AsyncTest.failTest("subscribeToStreams","You did not subscribe to all of the streams. Check your iteration.")},1)})}setTimeout(function(){if("object"==typeof TB){AsyncTest.passTest("defineTB");var b={};b.initSession=$.proxy(TB.initSession,TB),TB.initSession=function(c){var d;return"string"!=typeof c?(AsyncTest.failTest("sessionInitialized","You passed in an invalid parameter to TB.initSession(). This method only takes a String."),void 0):((c.length<80||c.length>82)&&(AsyncTest.failTest("sessionInitialized","The sessionId passed to TB.initSession() is not valid"),console.log(c)),AsyncTest.passTest("sessionInitialized"),d=b.initSession(c),a(d),d)},b.initPublisher=$.proxy(TB.initPublisher,TB),TB.initPublisher=function(a,c){return"string"!=typeof a&&"number"!=typeof a?(AsyncTest.failTest("publisherInitialized","You passed in an invalid apiKey parameter to TB.initPublisher(). This parameter must be a String."),void 0):"myCam"!==c?(AsyncTest.failTest("publisherInitialized","You passed an invalid replacementElementid to TB.initPublisher()."),void 0):(AsyncTest.passTest("publisherInitialized"),b.initPublisher(a,c))}}else AsyncTest.failTest("defineTB","TB is not defined");1===$("#myCam").length?AsyncTest.passTest("publisherElement"):AsyncTest.failTest("publisherElement",'An element with the id of "myCam" was not found.'),1===$("#subscribers").length?AsyncTest.passTest("subscriberElement"):AsyncTest.failTest("subscriberElement",'An element with the id of "subscribers" was not found.')},1)}};