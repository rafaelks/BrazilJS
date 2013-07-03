var ApplicationWindow = function() {
	var UI = require("/lib/UI/UI");

	var WinTalks = require("/ui/WinTalks");
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
