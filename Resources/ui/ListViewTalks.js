var ListViewTalks = function(dict) {
	var UI = require("/lib/UI/UI");
	var TiDate = require("/lib/TiDate/TiDate");
	var RowTalk = require("/lib/UI/TableViewRow").talk;
	var SectionTalks = require("/lib/UI/TableViewSection").talks;
	var WSRequest = require("/lib/WS/WSRequest");

	var rows = [];
	var self = UI.createTableView();

	dict.mainWindow.addEventListener("open", function() {
		WSRequest.getTalks(function(data) {
			var sectionsList = [];
			var sections = {};

			data.forEach(function(talk) {
				var date = TiDate.getDateFormatted(talk.startAt);

				if (sections[date] == null) {
					sections[date] = new SectionTalks(date);
					sectionsList.push(sections[date]);
				}

				sections[date].add( new RowTalk(talk) );
			});

			self.setData(sectionsList);
			dict.mainWindow.fireEvent("dataLoaded");
		});
	});

	return self;
};

module.exports = ListViewTalks;