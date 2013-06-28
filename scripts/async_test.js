// TODO: start timeout after some begin() function is called
// TODO: uncaught referenceerror's are not clearly reported

/*
  @class Async Tester
  This object is used to queue up multiple async events and wait on all of them before
  completing the exercise. A failed event will short circuit the evaluation.

  Credit where credit is due: https://github.com/Mattieuga/test
*/
var AsyncTest = {
    logger: true, // turn off in prod
    internalEvent: 'opentok_async_test_event',
    waitEvents: ["referenceError"],
    forceFailEvent: 'opentok_async_fail_event',
    resultsText: 'All done!',
    timeout: 10000,

    // Add event to queue. All events added must be triggered with a pass before the
    // exercise is completed.
    waitOn: function(eventName) {
        this.waitEvents.push(eventName);
        if (this.logger) { console.log('Will wait on event ' + eventName); }
    },

    // Set the test to run. This is just to avoid having to write the button hadnler
    // and the set timeout. The set timeout is used to ensure the user's button handler is
    // executed first
    setTest: function(func) {
      // TODO: set up a way to kick things off?
      setTimeout(function(){
          func();
      }, 1);
    },

    // Call at the end of submission test, will start the waiting loop
    startWaiting: function() {
        var self = this;

        // Don't wait if no events are left
        if (this.waitEvents.length > 0) {
            if (this.logger) { console.log('Waiting on ' + this.waitEvents.length + ' events'); }
            // Test Completion Handler
            $expect(window).on(this.internalEvent, function(event, externalEvent, passed, message) {
                if (self.logger) { console.log('Event \'' + externalEvent + '\' triggered with: ' + passed + ', ' + message); }

                debugger;
                // A fail short circuits the evaluation
                if (( !passed && self.waitEvents.indexOf(externalEvent) != -1 ) || externalEvent === self.forceFailEvent) {
                    // Force a fail and show custom message
                    if (self.logger) { console.log('Event ' + externalEvent + ' failed!'); }
                    // TODO: indicate a failure in the UI
                    $expect('html').to.be.empty(message);
                } else {
                    // If passed, remove event and see if we are waiting on anything else
                    var index = $.inArray(externalEvent, self.waitEvents);
                    if (index >= 0) {
                        self.waitEvents.splice(index, 1);
                    }
                    self.startWaiting();
                }
            }); 
        } else {
            // TODO: indicate the results of the test run
            if (this.logger) { console.log('All events triggered!'); }
        }
    },

    // Trigger an event with a given name and provide whether the test passed and the message to show.
    // (message for failure only)
    triggerEvent: function(eventName , passed, message) {
        if (typeof(message) === 'undefined') {
            message = '';
        }

        console.log('triggering event ' + eventName + ' with passed: ' + (passed ? 'true' : 'false'));

        // Trigger the event
        $(window).trigger(this.internalEvent, [eventName, passed, message]);
    },

    // This is the same as triggerEvent("someEvent", false, message). Just avoids writing a nonesense event
    // name when you just want to fail
    fail: function(message) {
        if (typeof(message) === 'nil') {
            message = 'Looks like something went wrong on our end. Try reloading the page.';
        }
        // Fail this exercise
        $(window).trigger(this.internalEvent, [this.forceFailEvent, false, message]);
    },

    // Creates element on page corresponding to this test
    addTest: function(testEvent, displayName, failOnTimeout, passOnTimeout) {
    //addTest: function(testEvent, displayName, timeoutProp) {

     // {
     //   time: 10000,
     //   eventDependent: 'eventName',
     //   passOrFail: 'pass'
     // }

        $('<li id="'+testEvent+'"><span class="icon"></span><p class="display-name">'+displayName+'</p></li>').appendTo('#testing');
        this.waitOn(testEvent);
        if (failOnTimeout || passOnTimeout) {
            setTimeout(function() {
                if (failOnTimeout) {
                    if (AsyncTest.waitEvents.indexOf(testEvent) != -1) {
                        AsyncTest.failTest(testEvent, 'The test ' + testEvent + ' was not completed');
                    }
                } else {
                    AsyncTest.passTest(testEvent);
                }
            }, this.timeout);
        }
    },

    // Makes the element for this test look pretty
    passTest: function(testEvent) {
        $('#'+testEvent).attr('class', '');
        $('#'+testEvent).addClass('pass');
        AsyncTest.updateUI();
        AsyncTest.triggerEvent(testEvent, true);
    },

    // Makes the element for this test look sad
    failTest: function(testEvent, message) {
        $('#'+testEvent).attr('class', '');
        $('#'+testEvent).addClass('fail');
        $('<p class="fail-reason">'+message+'</p>').appendTo('#'+testEvent)
        AsyncTest.updateUI();
        AsyncTest.triggerEvent(testEvent, false, message);
    },

    init: function() {
        // Set up the test reporting area on the page
        $('<div id="testing"><h4>Test Results</h4><ul></ul></div>').appendTo('body');
        AsyncTest.updateUI();
    },

    updateUI: function() {
        $('#testing .icon').spin('tiny');
        $('#testing .pass .icon').spin(false);
        $('#testing .fail .icon').spin(false);
    },

    instrument: function() {
        setTimeout(function() {
            if (typeof TB == 'object') {

                AsyncTest.passTest('defineTB');

                // Shell that holds plucked methods from original TB
                var _TB = {};

                // --- sessionInitialized
                _TB.initSession = $.proxy(TB.initSession, TB);
                TB.initSession = function(sessionId) {
                    var newSession;

                    // check args
                    if (typeof sessionId != 'string') {
                        AsyncTest.failTest('sessionInitialized',
                            'You passed in an invalid parameter to TB.initSession(). This method only takes a String.'
                        );
                        return;
                    }
                    if (sessionId.length < 80 || sessionId.length > 82) {
                        AsyncTest.failTest('sessionInitialized', 'The sessionId passed to TB.initSession() is not valid');
                        console.log(sessionId);
                    }
                    // trigger success
                    AsyncTest.passTest('sessionInitialized');

                    // call the real method
                    newSession = _TB.initSession(sessionId);
                    instrumentSession(newSession);
                    return newSession;
                }

                //--- publisherInitialized
                _TB.initPublisher = $.proxy(TB.initPublisher, TB);
                TB.initPublisher = function(apiKey, elementId) {
                    // check args
                    if (typeof apiKey != 'string' && typeof apiKey != 'number') {
                        AsyncTest.failTest('publisherInitialized',
                            'You passed in an invalid apiKey parameter to TB.initPublisher(). This parameter must be a String.'
                        );
                        return;
                    }

                    if (elementId !== 'myCam') {
                        AsyncTest.failTest('publisherInitialized',
                            'You passed an invalid replacementElementid to TB.initPublisher().'
                        );
                        return;
                    }

                    AsyncTest.passTest('publisherInitialized');

                    // TODO: reminder to click allow

                    return _TB.initPublisher(apiKey, elementId);
                }

                //--- TBexception
                TB.addEventListener('exception', function(event) {
                  AsyncTest.fail(event.message);
                });
            } else {
              AsyncTest.failTest('defineTB', 'TB is not defined');
            }

            //--- publisherElement
            if ($('#myCam').length === 1) {
                AsyncTest.passTest('publisherElement');
            } else {
                AsyncTest.failTest('publisherElement', 'An element with the id of "myCam" was not found.');
            }

            //--- subscriberElement
            if ($('#subscribers').length === 1) {
                AsyncTest.passTest('subscriberElement');
            } else {
                AsyncTest.failTest('subscriberElement', 'An element with the id of "subscribers" was not found.');
            }
        }, 1);

        function instrumentSession(session) {
            var streams = [];
            console.log('instrumenting session');

            //--- addEventListener
            var _addEventListener = $.proxy(session.addEventListener, session);
            session.addEventListener = function(eventName, callback) {
                if (eventName === 'sessionConnected' && callback.name == 'sessionConnectedHandler') {
                  AsyncTest.passTest('sessionConnectedHandler');
                }
                if (eventName === 'streamCreated' && callback.name == 'streamCreatedHandler') {
                  AsyncTest.passTest('streamCreatedHandler');
                }
                _addEventListener(eventName, callback);
            };


            //--- sessionConnected
            var _connect = $.proxy(session.connect, session);
            session.connect = function(apiKey, token) {
                    // check args
                    if (typeof apiKey != 'string' && typeof apiKey != 'number') {
                            AsyncTest.failTest('sessionConnected',
                                'You passed in an invalid apiKey parameter to session.connect(). This parameter must be a String.'
                            );
                            return;
                    }
                    if (typeof token != 'string') {
                            AsyncTest.failTest('sessionConnected',
                                'You passed in an invalid token parameter to session.connect(). This parameter must be a String.'
                            );
                            return;
                    }
                    _connect(apiKey, token);
            };

            //--- subscribe
            var _subscribe = $.proxy(session.subscribe, session);
            session.subscribe = function(stream, elementId) {
                // check args
                if (typeof stream != 'object' && typeof stream.streamId != 'string') {
                    AsyncTest.failTest('subscribeToStreams',
                        'You passed in an invalid stream parameter to session.subscribe(). This parameter must be a Stream.'
                    );
                    return;
                }
                if (typeof elementId != 'string') {
                    AsyncTest.failTest('subscribeToStreams',
                        'You passed in an invalid replacementElementId parameter to session.subscribe(). This parameter must be a String.'
                    );
                    return;
                }

                if (stream.connection.connectionId == session.connection.connectionId) {
                    AsyncTest.failTest('excludeOwnStream',
                        'You tried to subscribe to your own stream. Exclude it using the condition described.'
                    );
                    return;
                } else {
                    AsyncTest.passTest('subscribeOtherStream');
                }

                var streamIndex = streams.indexOf(stream.streamId);
                if (streamIndex == -1) {
                    console.log('impossible! could not find ' + stream.streamId);
                } else {
                    // remove from array
                    streams.splice(streamIndex, 1);
                }

                return _subscribe(stream, elementId);
            };

            session.addEventListener('sessionConnected', function(e) {
                    AsyncTest.passTest('sessionConnected');
            });
            session.addEventListener('streamCreated', function(e) {
                console.log('stream created internal handler');
                e.streams.forEach(function(stream) {
                    if (stream.connection.connectionId == session.connection.connectionId) {
                        AsyncTest.passTest('publishedStream');
                    } else {
                        streams.push(stream.streamId);
                        console.log('pushed streamId ' + stream.streamId);
                    }
                });
                setTimeout(function() {
                    if (streams.length != 0) {
                        AsyncTest.failTest('subscribeToStreams',
                            'You did not subscribe to all of the streams. Check your iteration.'
                        );
                    }
                }, 1);
            });
        }
    }
};

