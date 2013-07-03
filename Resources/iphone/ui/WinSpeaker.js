var WinTalk = function(dict) {
	var UI = require("/lib/UI/UI");
	var HeaderViewSpeaker = require("/ui/HeaderViewSpeaker");
	var obj = dict.obj || {};
	var sections = [];

	var buttonActions = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.ACTION
	});

	var self = UI.createWindow({
		rightNavButton: buttonActions,
		title: obj.name
	});

	var rowTwitter = UI.createTableViewRow();

	rowTwitter.add( UI.createLabel({
		font: { fontSize: 16, fontWeight: "bold" },
		height: Ti.UI.SIZE,
		left: 10,
		text: "Twitter"
	}) );

	rowTwitter.add( UI.createLabel({
		font: { fontSize: 16 },
		height: Ti.UI.SIZE,
		right: 10,
		text: "@rafaelks"
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
		data: [rowTwitter, rowDescription],
		headerView: new HeaderViewSpeaker({ obj: obj }),
		style: Ti.UI.iPhone.TableViewStyle.GROUPED
	});
	self.add(tableView);

	buttonActions.addEventListener("click", function() {

	});

	return self;
};

module.exports = WinTalk;
