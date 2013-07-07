var WinTalk = function(dict) {
	var UI = require("/lib/UI/UI");
	var HeaderViewSpeaker = require("/ui/HeaderViewSpeaker");
	var i18n = require("/lib/i18n/Remote");
	var obj = dict.obj || {};
	var rows = [];
	var rowTwitter, rowGitHub, rowWebSite;

	var buttonActions = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.ACTION
	});

	var self = UI.createWindow({
		rightNavButton: buttonActions,
		title: obj.name
	});

	if (obj.twitter != null && obj.twitter.length) {
		rows.push( rowTwitter = UI.createTableViewRow({
			type: "twitter",
			link: "http://twitter.com/" + obj.twitter
		}) );

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
			text: "@" + obj.twitter
		}) );
	}

	if (obj.github != null && obj.github.length) {
		rows.push( rowGitHub = UI.createTableViewRow({
			type: "github",
			link: "http://github.com/" + obj.github
		}) );

		rowGitHub.add( UI.createLabel({
			font: { fontSize: 16, fontWeight: "bold" },
			height: Ti.UI.SIZE,
			left: 10,
			text: "GitHub"
		}) );

		rowGitHub.add( UI.createLabel({
			font: { fontSize: 16 },
			height: Ti.UI.SIZE,
			right: 10,
			text: obj.github
		}) );
	}

	if (obj.website != null && obj.website.length) {
		rows.push( rowWebSite = UI.createTableViewRow({
			type: "website",
			link: obj.website
		}) );

		rowWebSite.add( UI.createLabel({
			font: { fontSize: 16, fontWeight: "bold" },
			height: Ti.UI.SIZE,
			left: 10,
			text: "Site"
		}) );

		rowWebSite.add( UI.createLabel({
			font: { fontSize: 16 },
			height: Ti.UI.SIZE,
			right: 10,
			text: obj.website
		}) );
	}

	var rowDescription = Ti.UI.createTableViewRow({
		height: Ti.UI.SIZE,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	rows.push(rowDescription);

	rowDescription.add( UI.createLabel({
		bottom: 10,
		font: { fontSize: 16 },
		height: Ti.UI.SIZE,
		left: 10,
		right: 10,
		text: i18n.getValue(obj.description),
		top: 10
	}) );

	var tableView = UI.createTableView({
		backgroundColor: "#FFF",
		data: rows,
		headerView: new HeaderViewSpeaker({ obj: obj }),
		style: Ti.UI.iPhone.TableViewStyle.GROUPED
	});
	self.add(tableView);

	tableView.addEventListener("click", function(e) {
		var link = e.row.link;
		if (link != null && link.length && Ti.Platform.canOpenURL(link)) {
			Ti.Platform.openURL(link);
		}
	});

	buttonActions.addEventListener("click", function() {

	});

	return self;
};

module.exports = WinTalk;
