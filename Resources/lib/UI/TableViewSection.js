var UI = require("/lib/UI/UI");


exports.talks = function(date) {
	return UI.createTableViewSection({
		headerTitle: date
	});
};
