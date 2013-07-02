var WinLocation = function() {
	var UI = require("/lib/UI/UI");
	var ViewLocation = require("/ui/ViewLocation");

	var buttonAbout = Ti.UI.createButton({
		title: L("about")
	});

	var self = UI.createWindow({
		rightNavButton: buttonAbout,
		title: L("location")
	});

	self.add( new ViewLocation({
		mainWindow: self
	}) );

	buttonAbout.addEventListener("click", function() {
		var WinAbout = require("/ui/WinAbout");
		new WinAbout().open();
	});

	return self;
};

module.exports = WinLocation;
