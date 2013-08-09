var WS = require("/lib/WS/WS");

exports.getTalks = function(dict) {
	WS._request({
		url: "talks",
		type: "GET",
		onerror: dict.onerror,
		onload: function(response) {
			dict.onload( response.data );
		}
	});
};


exports.registerPushToken = function(token, callback) {
	var platform = (Ti.Platform.osname === "android") ? "android" : "ios";

	WS._request({
		url: "device/" + platform + "/" + token,
		type: "POST",
		onload: callback
	});
};