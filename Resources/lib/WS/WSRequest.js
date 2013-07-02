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