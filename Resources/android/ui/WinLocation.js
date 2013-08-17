var WinLocation = function() {
	var UI = require("/lib/UI/UI");
	var ViewLocation = require("/ui/ViewLocation");

	var self = UI.createWindow({
		actionBarBackButton: true,
		navBarHidden: false,
		title: L("location")
	});

	self.add( new ViewLocation({
		mainWindow: self
	}) );

	return self;
};

module.exports = WinLocation;
