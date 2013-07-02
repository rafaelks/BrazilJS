var WinTalks = function() {
	var UI = require("/lib/UI/UI");
	var ListViewTalks = require("/ui/ListViewTalks");

	var self = UI.createWindow();

	self.add( new ListViewTalks({
		mainWindow: self
	}) );

	return self;
};

module.exports = WinTalks;
