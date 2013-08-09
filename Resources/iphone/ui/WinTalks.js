var WinTalks = function(dict) {
	var tab = dict.tab;
	var UI = require("/lib/UI/UI");
	var ListViewTalks = require("/ui/ListViewTalks");
	var selectedRow;

	var activityIndicator = Ti.UI.createActivityIndicator();
	activityIndicator.show();

	var buttonRefresh = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.REFRESH
	});

	var self = UI.createWindow({
		rightNavButton: activityIndicator,
		title: L("talks")
	});

	var tableView = new ListViewTalks({
		mainWindow: self
	});
	self.add(tableView);

	tableView.addEventListener("click", function(e) {
		if (e.row._hasChild) {
			selectedRow = e.index;
			tableView.selectRow(e.index, { animated: false });

			var obj = e.rowData.obj;
			var WinTalk = require("/ui/WinTalk");
			tab.open( new WinTalk({
				obj: obj,
				tab: tab
			}) );
		}
	});

	self.addEventListener("focus", function() {
		setTimeout(function() {
			if (selectedRow != null) {
				tableView.deselectRow(selectedRow, { animated: true });
				selectedRow = null;
			}
		}, 200);
	});

	self.addEventListener("dataError", function() {
		self.setRightNavButton(buttonRefresh);
	});

	self.addEventListener("dataLoaded", function() {
		self.setRightNavButton(buttonRefresh);
	});

	buttonRefresh.addEventListener("click", function() {
		tableView.fireEvent("dataReload");
		self.setRightNavButton(activityIndicator);
	});

	return self;
};

module.exports = WinTalks;
