var WinAbout = function() {
	var UI = require("/lib/UI/UI");
	var RowTwitter = require("/lib/UI/TableViewRow").twitter;
	var SectionAbout = require("/lib/UI/TableViewSection").gray;

	var self = UI.createWindow({
		actionBarBackButton: true,
		navBarHidden: false,
		title: L("about")
	});

	var sectionOrganizers = new SectionAbout(L("organizers"));
	sectionOrganizers.add( new RowTwitter("jaydson") );
	sectionOrganizers.add( new RowTwitter("felipenmoura") );

	var sectionDevelopers = new SectionAbout(L("developers"));
	sectionDevelopers.add( new RowTwitter("rafaelks") );
	sectionDevelopers.add( new RowTwitter("orodrigok") );

	var footerViewTableView = UI.createView({
		height: 50,
		width: Ti.UI.FILL
	});

	footerViewTableView.add( UI.createLabel({
		color: "#4C566C",
		text: "braziljs.com.br - 2013"
	}) );

	var tableView = UI.createTableView({
		footerView: footerViewTableView,
		sections: [sectionOrganizers, sectionDevelopers],
		separatorColor: "#BEBEBE"
	});
	self.add(tableView);

	tableView.addEventListener("click", function(e) {
		var twitter = e.row.twitter;
		var link = "http://twitter.com/" + twitter;
		if (twitter != null && twitter.length) {
			Ti.Platform.openURL(link);
		}
	});

	footerViewTableView.addEventListener("click", function() {
		Ti.Platform.openURL("http://braziljs.com.br");
	});

	return self;
};

module.exports = WinAbout;
