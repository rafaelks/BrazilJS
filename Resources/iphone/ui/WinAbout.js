var WinAbout = function() {
	var UI = require("/lib/UI/UI");
	var RowDeveloper = require("/lib/UI/TableViewRow").developer;

	var buttonClose = Ti.UI.createButton({
		title: L("close")
	});

	var self = UI.createWindow({
		leftNavButton: buttonClose,
		modal: true,
		title: L("about")
	});

	var sectionDevelopers = Ti.UI.createTableViewSection({
		headerTitle: L("developers")
	});
	sectionDevelopers.add( new RowDeveloper("Rafael K. Streit", "rafaelks") );
	sectionDevelopers.add( new RowDeveloper("Rodrigo K. N.", "orodrigok") );

	var tableView = UI.createTableView({
		sections: [sectionDevelopers],
		style: Ti.UI.iPhone.TableViewStyle.GROUPED
	});
	self.add(tableView);

	buttonClose.addEventListener("click", function() {
		self.close();
	});

	return self;
};

module.exports = WinAbout;
