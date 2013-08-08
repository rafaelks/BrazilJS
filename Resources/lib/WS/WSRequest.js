var WS = require("/lib/WS/WS");

exports.getTalks = function(callback) {
	WS._request({
		url: "talks",
		type: "GET",
		onload: function(response) {
			callback( response.data );
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