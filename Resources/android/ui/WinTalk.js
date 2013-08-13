var WinTalk = function(dict) {
	var UI = require("/lib/UI/UI");
	var HeaderViewTalk = require("/ui/HeaderViewTalk");
	var i18n = require("/lib/i18n/Remote");
	var tab = dict.tab;
	var obj = dict.obj || {};
	var rows = [];

	var self = UI.createWindow({
		actionBarBackButton: true,
		navBarHidden: false,
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

	var description = i18n.getValue(obj.description);
	if (description.length) {
		var rowDescription = Ti.UI.createTableViewRow({
			height: Ti.UI.SIZE,
			selectedBackgroundColor: "#FFF"
		});

		rowDescription.add( UI.createLabel({
			bottom: 10,
			font: { fontSize: 16 },
			height: Ti.UI.SIZE,
			left: 10,
			right: 10,
			text: description,
			top: 10
		}) );

		rows.push(rowDescription);
	}

	var tableView = UI.createTableView({
		data: rows,
		headerView: new HeaderViewTalk({ obj: obj }),
		left: 10,
		right: 10,
		separatorColor: "#BEBEBE"
	});
	self.add(tableView);

	tableView.addEventListener("click", function(e) {
		if (e.row.type == "speaker") {
			var obj = e.row.obj;
			var WinSpeaker = require("/ui/WinSpeaker");
			new WinSpeaker({
				obj: obj
			}).open();
		}
	});

	return self;
};

module.exports = WinTalk;
