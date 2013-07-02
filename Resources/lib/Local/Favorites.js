var Local = require("/lib/Local/Local");
var Properties = Local.Properties;

// Favorites Property name
var P_FAVORITES = "Favorites";


// Method that will try to get object based in _id
// but if data exists but date is more then the constant
// of minutes to get data, will return null
var getFavorites = function() {
	// Verify if have some saved favorite
	if (Properties.hasProperty(P_FAVORITES)) {
		return Properties.getList(P_FAVORITES);
	}

	return null;
};
exports.getFavorites = getFavorites;


// Method that will save a new object in properties
exports.saveFavorite = function(dict) {
	// Try to get Favorites. If can't get a blank array
	var favorites = getFavorites() || [];

	// Save new Favorites
	favorites.push(Local.cleanJSON(dict));
	Properties.setList(P_FAVORITES, favorites);
	return favorites;
};



// Method that will remove a existent favorite
exports.removeFavorite = function(_id) {
	var favorites = getFavorites() || [];
	var newFavorites = [];

	for (var i = 0, j = favorites.length; i < j; i++) {
		if (favorites[i]._id != _id) {
			newFavorites.push( favorites[i] );
		}
	}

	Properties.setList(P_FAVORITES, newFavorites);
	return newFavorites;
};
