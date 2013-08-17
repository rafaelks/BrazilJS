var ListViewTalks = function(dict) {
	var UI = require("/lib/UI/UI");
	var TiDate = require("/lib/TiDate/TiDate");
	var RowTalk = require("/lib/UI/TableViewRow").talk;
	var SectionTalks = require("/lib/UI/TableViewSection").gray;
	var WSRequest = require("/lib/WS/WSRequest");

	var rows = [];
	var self = UI.createTableView({
		separatorColor: "#BEBEBE"
	});

	var loadData = function() {
		WSRequest.getTalks({
			onload: function(data) {
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
			},
			onerror: function() {
				dict.mainWindow.fireEvent("dataError");
			}
		});
	}

	self.addEventListener("dataReload", function() {
		loadData();
	});

	dict.mainWindow.addEventListener("open", function() {
		loadData();
	});

	return self;
};

module.exports = ListViewTalks;