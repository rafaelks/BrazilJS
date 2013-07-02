var WS = require("/lib/WS/WS");

exports.getTalks = function(dict) {
	WS._request({
		url: "Products/referencedByCard/" + id,
		type: "GET",
		onload: function(response) {
			callback( response.data );
		}
	});
};


exports.getSpeakers = function(dict) {
	WS._request({
		url: "Products/referencedByCard/" + id,
		type: "GET",
		onload: function(response) {
			callback( response.data );
		}
	});
};