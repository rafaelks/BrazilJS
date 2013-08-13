var isAndroid = (Ti.Platform.osname === "android");
var dpi = Ti.Platform.displayCaps.dpi;
var w = Ti.Platform.displayCaps.platformWidth / dpi;
var h = Ti.Platform.displayCaps.platformHeight / dpi;
var diagonalSize = Math.sqrt(w * w + h * h);

exports.isAndroid = isAndroid;
exports.API_LEVEL = (isAndroid) ? Ti.Platform.Android.API_LEVEL : 0;

exports.isTablet = (function(diagonalInches) {
	var diag = (diagonalInches) ? parseFloat(diagonalInches) : 6.5;
	return (diagonalSize >= diag) ? true : false;
})();