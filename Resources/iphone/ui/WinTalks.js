var WinTalks = function(dict) {
	var tab = dict.tab;
	var UI = require("/lib/UI/UI");
	var ListViewTalks = require("/ui/ListViewTalks");
	var selectedRow;

	var self = UI.createWindow({
		title: L("talks")
	});

	var tableView = new ListViewTalks({
		mainWindow: self
	});
	self.add(tableView);

	tableView.addEventListener("click", function(e) {
		selectedRow = e.index;
		tableView.selectRow(e.index, { animated: false });

		var obj = e.rowData.obj;
		var WinTalk = require("/ui/WinTalk");
		tab.open( new WinTalk({
			obj: obj,
			tab: tab
		}) );
	});

	self.addEventListener("focus", function() {
		setTimeout(function() {
			if (selectedRow != null) {
				tableView.deselectRow(selectedRow, { animated: true });
				selectedRow = null;
			}
		}, 200);
	});

	return self;
};

module.exports = WinTalks;
