var ApplicationWindow = function() {
	var UI = require("/lib/UI/UI");
	var P = require("/lib/Platform");
	var WinTalks = require("/ui/WinTalks");

	var self = new WinTalks();
	return self;
};

module.exports = ApplicationWindow;
