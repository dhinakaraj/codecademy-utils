var AsyncTest={logger:!0,internalEvent:"opentok_async_test_event",waitEvents:[],forceFailEvent:"opentok_async_fail_event",resultsText:"All done!",timeout:1e4,waitOn:function(a){this.waitEvents.push(a),this.logger&&console.log("Will wait on event "+a)},setTest:function(a){setTimeout(function(){a()},1)},startWaiting:function(){var a=this;this.waitEvents.length>0?(this.logger&&console.log("Waiting on "+this.waitEvents.length+" events"),$expect(window).on(this.internalEvent,function(b,c,d,e){if(a.logger&&console.log("Event '"+c+"' triggered with: "+d+", "+e),!d&&-1!=a.waitEvents.indexOf(c)||b===a.forceFailEvent)a.logger&&console.log("Event "+c+" failed!"),$expect("html").to.be.empty(e);else{var f=$.inArray(c,a.waitEvents);f>=0&&a.waitEvents.splice(f,1),a.startWaiting()}})):this.logger&&console.log("All events triggered!")},triggerEvent:function(a,b,c){"undefined"==typeof c&&(c=""),console.log("triggering event "+a+" with passed: "+(b?"true":"false")),console.log("this is:"),console.log(this),$(window).trigger(this.internalEvent,[a,b,c])},fail:function(a){"nil"==typeof a&&(a="Looks like something went wrong on our end. Try reloading the page."),$(window).trigger(this.internalEvent,[this.forceFailEvent,!1,a])},addTest:function(a,b,c,d){$('<li id="'+a+'">'+b+"</li>").appendTo("#testing"),this.waitOn(a),(c||d)&&setTimeout(function(){c?-1!=AsyncTest.waitEvents.indexOf(a)&&AsyncTest.failTest(a,"The test "+a+" was not completed"):AsyncTest.passTest(a)},this.timeout)},passTest:function(a){$("#"+a).css("color","green"),AsyncTest.triggerEvent(a,!0)},failTest:function(a,b){$("#"+a).css("color","red"),AsyncTest.triggerEvent(a,!1,b)},init:function(){$('<ul id="testing"></ul>').appendTo("body")},instrument:function(){function a(a){var b=[];console.log("instrumenting session");var c=$.proxy(a.addEventListener,a);a.addEventListener=function(a,b){"sessionConnected"===a&&"sessionConnectedHandler"==b.name&&AsyncTest.passTest("sessionConnectedHandler"),"streamCreated"===a&&"streamCreatedHandler"==b.name&&AsyncTest.passTest("streamCreatedHandler"),c(a,b)};var d=$.proxy(a.connect,a);a.connect=function(a,b){return"string"!=typeof a&&"number"!=typeof a?(AsyncTest.failTest("sessionConnected","You passed in an invalid apiKey parameter to session.connect(). This parameter must be a String."),void 0):"string"!=typeof b?(AsyncTest.failTest("sessionConnected","You passed in an invalid token parameter to session.connect(). This parameter must be a String."),void 0):(d(a,b),void 0)};var e=$.proxy(a.subscribe,a);a.subscribe=function(c,d){if("object"!=typeof c&&"string"!=typeof c.streamId)return AsyncTest.failTest("subscribeToStreams","You passed in an invalid stream parameter to session.subscribe(). This parameter must be a Stream."),void 0;if("string"!=typeof d)return AsyncTest.failTest("subscribeToStreams","You passed in an invalid replacementElementId parameter to session.subscribe(). This parameter must be a String."),void 0;if(c.connection.connectionId==a.connection.connectionId)return AsyncTest.failTest("excludeOwnStream","You tried to subscribe to your own stream. Exclude it using the condition described."),void 0;AsyncTest.passTest("subscribeOtherStream");var f=b.indexOf(c.streamId);return-1==f?console.log("impossible! could not find "+c.streamId):b.splice(f,1),e(c,d)},a.addEventListener("sessionConnected",function(){AsyncTest.passTest("sessionConnected")}),a.addEventListener("streamCreated",function(c){console.log("stream created internal handler"),c.streams.forEach(function(c){c.connection.connectionId==a.connection.connectionId?AsyncTest.passTest("publishedStream"):(b.push(c.streamId),console.log("pushed streamId "+c.streamId))}),setTimeout(function(){0!=b.length&&AsyncTest.failTest("subscribeToStreams","You did not subscribe to all of the streams. Check your iteration.")},1)})}setTimeout(function(){if("object"==typeof TB){AsyncTest.passTest("defineTB");var b={};b.initSession=$.proxy(TB.initSession,TB),TB.initSession=function(c){var d;return"string"!=typeof c?(AsyncTest.failTest("sessionInitialized","You passed in an invalid parameter to TB.initSession(). This method only takes a String."),void 0):((c.length<80||c.length>82)&&(AsyncTest.failTest("sessionInitialized","The sessionId passed to TB.initSession() is not valid"),console.log(c)),AsyncTest.passTest("sessionInitialized"),d=b.initSession(c),a(d),d)},b.initPublisher=$.proxy(TB.initPublisher,TB),TB.initPublisher=function(a,c){return"string"!=typeof a&&"number"!=typeof a?(AsyncTest.failTest("publisherInitialized","You passed in an invalid apiKey parameter to TB.initPublisher(). This parameter must be a String."),void 0):"myCam"!==c?(AsyncTest.failTest("publisherInitialized","You passed an invalid replacementElementid to TB.initPublisher()."),void 0):(AsyncTest.passTest("publisherInitialized"),b.initPublisher(a,c))}}else AsyncTest.failTest("defineTB","TB is not defined");1===$("#myCam").length?AsyncTest.passTest("publisherElement"):AsyncTest.failTest("publisherElement",'An element with the id of "myCam" was not found.'),1===$("#subscribers").length?AsyncTest.passTest("subscriberElement"):AsyncTest.failTest("subscriberElement",'An element with the id of "subscribers" was not found.')},1)}};