var WinAbout = function() {
	var UI = require("/lib/UI/UI");

	var buttonClose = Ti.UI.createButton({
		title: L("close")
	});

	var self = UI.createWindow({
		leftNavButton: buttonClose,
		modal: true,
		title: L("about")
	});

	buttonClose.addEventListener("click", function() {
		self.close();
	});

	return self;
};

module.exports = WinAbout;
