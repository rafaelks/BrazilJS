var WinTalk = function(dict) {
	var UI = require("/lib/UI/UI");
	var HeaderViewTalk = require("/ui/HeaderViewTalk");
	var tab = dict.tab;
	var obj = dict.obj || {};
	var sections = [];
	var selectedRow;

	var buttonActions = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.ACTION
	});

	var self = UI.createWindow({
		rightNavButton: buttonActions,
		title: L("talk")
	});

	var rowSpeaker = UI.createTableViewRow({
		hasChild: true,
		height: Ti.UI.SIZE,
		obj: obj.speaker[0]
	});

	rowSpeaker.add( UI.createImageView({
		bottom: 5,
		image: obj.image,
		height: 40,
		left: 10,
		top: 5,
		width: 40
	}) );

	rowSpeaker.add( UI.createLabel({
		font: { fontSize: 16 },
		height: Ti.UI.SIZE,
		left: 60,
		text: "Douglas Crockford"
	}) );

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
		text: "Lorem ipsum Officia non reprehenderit aliqua eiusmod id ullamco Excepteur tempor dolor fugiat Duis nulla occaecat eu enim tempor cillum voluptate et fugiat consequat dolor culpa eu incididunt aliquip.",
		top: 10
	}) );

	var tableView = UI.createTableView({
		backgroundColor: "#FFF",
		data: [rowSpeaker, rowDescription],
		headerView: new HeaderViewTalk({ obj: obj }),
		style: Ti.UI.iPhone.TableViewStyle.GROUPED
	});
	self.add(tableView);

	buttonActions.addEventListener("click", function() {

	});

	tableView.addEventListener("click", function(e) {
		if (e.index === 0) {
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
