var WinFavorites = function() {
	var UI = require("/lib/UI/UI");
	var ListViewFavorites = require("/ui/ListViewFavorites");

	var self = UI.createWindow({
		title: L("favorites")
	});

	self.add( new ListViewFavorites({
		mainWindow: self
	}) );

	return self;
};

module.exports = WinFavorites;
