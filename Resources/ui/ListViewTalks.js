var ListViewTalks = function(dict) {
	var UI = require("/lib/UI/UI");
	var RowTalk = require("/lib/UI/TableViewRow").talk;
	var WSRequest = require("/lib/WS/WSRequest");

	var rows = [];
	var self = UI.createTableView();

	dict.mainWindow.addEventListener("open", function() {
		WSRequest.getTalks(function(data) {
			data.forEach(function(talk) {
				rows.push( new RowTalk(talk) );
			});
			self.setData(rows);
		});
	});

	return self;
};

module.exports = ListViewTalks;