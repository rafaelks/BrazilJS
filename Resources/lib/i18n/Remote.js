var language = Ti.Locale.getCurrentLanguage();
var defaultLanguage = "en";

exports.getValue = function(obj) {
	var obj = obj || {};
	if (obj[language] != null && obj[language].length) {
		return obj[language]
	} else {
		return obj[defaultLanguage]
	}
};