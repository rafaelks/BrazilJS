var WinTalk = function(dict) {
	var UI = require("/lib/UI/UI");
	var HeaderViewTalk = require("/ui/HeaderViewTalk");
	var i18n = require("/lib/i18n/Remote");
	var tab = dict.tab;
	var obj = dict.obj || {};
	var rows = [];
	var selectedRow;

	var buttonActions = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.ACTION
	});

	var self = UI.createWindow({
		rightNavButton: buttonActions,
		title: L("talk")
	});

	obj.speaker.forEach(function(speaker) {
		var row = UI.createTableViewRow({
			type: "speaker",
			hasChild: true,
			height: Ti.UI.SIZE,
			obj: speaker
		});

		row.add( UI.createImageView({
			bottom: 5,
			image: "/images/" + speaker.image,
			height: 40,
			left: 10,
			top: 5,
			width: 40
		}) );

		row.add( UI.createLabel({
			font: { fontSize: 16 },
			height: Ti.UI.SIZE,
			left: 60,
			text: speaker.name
		}) );

		rows.push(row);
	});

	var rowDescription = Ti.UI.createTableViewRow({
		height: Ti.UI.SIZE,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});

	rowDescription.add( UI.createLabel({
		bottom: 10,
		font: { fontSize: 16 },
		height: Ti.UI.SIZE,
		left: 10,
		right: 10,
		text: i18n.getValue(obj.description),
		top: 10
	}) );

	rows.push(rowDescription);

	var tableView = UI.createTableView({
		backgroundColor: "#FFF",
		data: rows,
		headerView: new HeaderViewTalk({ obj: obj }),
		style: Ti.UI.iPhone.TableViewStyle.GROUPED
	});
	self.add(tableView);

	buttonActions.addEventListener("click", function() {

	});

	tableView.addEventListener("click", function(e) {
		if (e.row.type == "speaker") {
			tableView.selectRow(e.index, { animated: false });
			selectedRow = e.index;

			var obj = e.rowData.obj;
			var WinSpeaker = require("/ui/WinSpeaker");
			tab.open( new WinSpeaker({
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

	return self;
};

module.exports = WinTalk;
