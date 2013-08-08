var WinAbout = function() {
	var UI = require("/lib/UI/UI");
	var RowTwitter = require("/lib/UI/TableViewRow").twitter;

	var buttonClose = Ti.UI.createButton({
		title: L("close")
	});

	var self = UI.createWindow({
		leftNavButton: buttonClose,
		modal: true,
		title: L("about")
	});

	var sectionOrganizers = Ti.UI.createTableViewSection({
		headerTitle: L("organizers")
	});
	sectionOrganizers.add( new RowTwitter("jaydson") );
	sectionOrganizers.add( new RowTwitter("felipenmoura") );

	var sectionDevelopers = Ti.UI.createTableViewSection({
		headerTitle: L("developers")
	});
	sectionDevelopers.add( new RowTwitter("rafaelks") );
	sectionDevelopers.add( new RowTwitter("orodrigok") );

	var footerViewTableView = UI.createView({
		height: 50
	});

	footerViewTableView.add( UI.createLabel({
		color: "#4C566C",
		shadowColor: "#FFF",
		shadowOffset: { x: 0, y: 1},
		text: "braziljs.com.br - 2013"
	}) );

	var tableView = UI.createTableView({
		footerView: footerViewTableView,
		sections: [sectionOrganizers, sectionDevelopers],
		style: Ti.UI.iPhone.TableViewStyle.GROUPED
	});
	self.add(tableView);

	tableView.addEventListener("click", function(e) {
		var twitter = e.row.twitter;
		var link = "http://twitter.com/" + twitter;
		if (twitter != null && twitter.length && Ti.Platform.canOpenURL(link)) {
			Ti.Platform.openURL(link);
		}
	});

	footerViewTableView.addEventListener("click", function() {
		if (Ti.Platform.canOpenURL("http://braziljs.com.br")) {
			Ti.Platform.openURL("http://braziljs.com.br");
		}
	});

	buttonClose.addEventListener("click", function() {
		self.close();
	});

	return self;
};

module.exports = WinAbout;
