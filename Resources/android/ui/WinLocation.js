var WinLocation = function() {
	var UI = require("/lib/UI/UI");
	var ViewLocation = require("/ui/ViewLocation");

	var self = UI.createWindow();

	self.add( new ViewLocation({
		mainWindow: self
	}) );

	return self;
};

module.exports = WinLocation;
