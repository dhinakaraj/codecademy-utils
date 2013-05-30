// Proxy the TB methods to instrument
var orig_TB = {};
orig_TB.initSession = $.proxy(TB.initSession, TB);
TB.initSession = function(sessionId) {
	// check args
	if (typeof sessionId != 'string') {
		AsyncTest.triggerEvent('sessionInitialized', false, 'You passed in an invalid parameter to TB.initSession(). This method only takes a String.');
                return;
	}
	
	// trigger success
	AsyncTest.triggerEvent('sessionInitialized', true);
	
	// call the real method
	return orig_TB.initSession(sessionId);
};

$.ajax({
  url: "https://dashboard.tokbox.com/accounts/me.json",
  dataType: 'json',
  type: 'GET',
  data: {
    "api_key": "xxx",
    "api_secret": "xxx"
  } 
}).done(function(data) {
	window.YOUR_API_KEY = data.key.api_key;
	window.YOUR_SESSION_ID = data.key.session;
	window.YOUR_TOKEN = data.key.token;
	
	AsyncTest.waitOn('sessionInitialized');
	AsyncTest.startWaiting();
	
	loaded();
});
