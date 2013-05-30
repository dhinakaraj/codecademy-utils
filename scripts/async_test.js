/*
  @class Async Tester
  This object is used to queue up multiple async events and wait on all of them before
  completing the exercise. A failed event will short circuit the evaluation.

  Credit where credit is due: https://github.com/Mattieuga/test
*/
var AsyncTest = {
    logger: true, // turn off in prod
    internalEvent: 'opentok_async_test_event',
    waitEvents: [],
    forceFailEvent: 'opentok_async_fail_event',
    resultsText: 'All done!',

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

                // A fail short circuits the evaluation
                if (!passed || event === self.forceFailEvent) {
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
    }
};

/*
// Sample implementation

// Declare which tests you want to wait on
AsyncTest.waitOn('eventName');
// Just a function that starts all the testing in one place
AsyncTest.setTest(startTesting);
// Complete the set up
AsyncTest.startWaiting();

function startTesting() {
  el.on('asyncEvent', function(result) {
    // Complete the actual test
    AsyncTest.triggerEvent('eventName', isValid(result), 'Failure message');
  });
}
*/

console.log('6:42');
