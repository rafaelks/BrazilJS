var ApplicationWindow = function() {
	var UI = require("/lib/UI/UI");

	var WinTalks = require("/ui/WinTalks");
	var WinFavorites = require("/ui/WinFavorites");
	var WinLocation = require("/ui/WinLocation");

	var self = UI.createTabGroup({
		activeTabIconTint: UI.BAR_COLOR
	});

	var tabTalks = Ti.UI.createTab({
		icon: "/images/TabGroup-Talks.png",
		title: L("talks")
	});
	var winTalks = new WinTalks({ tab: tabTalks });
	tabTalks.setWindow(winTalks);
	self.addTab(tabTalks);

	var tabFavorites = Ti.UI.createTab({
		icon: "/images/TabGroup-Favorites.png",
		title: L("favorites")
	});
	var winFavorites = new WinFavorites({ tab: tabFavorites });
	tabFavorites.setWindow(winFavorites);
	self.addTab(tabFavorites);

	var tabLocation = Ti.UI.createTab({
		icon: "/images/TabGroup-Location.png",
		title: L("location")
	});
	var winLocation = new WinLocation({ tab: tabLocation });
	tabLocation.setWindow(winLocation);
	self.addTab(tabLocation);

	return self;
};

module.exports = ApplicationWindow;
