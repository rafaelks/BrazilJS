// Just a shortcut to Properties
exports.Properties = Ti.App.Properties;

// Method that removes *null* values by empty strings
exports.cleanJSON = function(data) {
	data = JSON.stringify(data)
	return JSON.parse(data.replace(/\:null/g,":\"\""))
};
