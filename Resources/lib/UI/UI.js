var isAndroid = (Ti.Platform.osname === "android");
var BAR_COLOR = "#B61E1C";
exports.BAR_COLOR = BAR_COLOR;

var Map;
if (isAndroid) {
	Map = require("ti.map");
} else {
	Map = Ti.Map;
}

var _extend = function(object, properties) {
	var key, val;
	for (key in properties) {
		val = properties[key];
		object[key] = val;
	}
	return object;
};


exports.createTabGroup = function(dict) {
	var dict = dict || {};
	return Ti.UI.createTabGroup(dict);
};


exports.createWindow = function(dict) {
	var dict = dict || {};
	var defaults = {
		backgroundColor: "#FFF",
		barColor: BAR_COLOR,
		orientationModes: [
			Ti.UI.PORTRAIT,
			Ti.UI.UPSIDE_PORTRAIT
		]
	};

	var properties = _extend(defaults, dict);
	win = Ti.UI.createWindow(properties);

	// Handle *back* button and actionBar title here
	if (isAndroid && properties.actionBarBackButton == true) {
		win.addEventListener("open", function() {
			var self = this;
			var actionBar = self.getActivity().actionBar;
			if (actionBar) {
				actionBar.setTitle( properties.title );
				actionBar.setDisplayHomeAsUp(true);
				actionBar.onHomeIconItemSelected = function() {
					self.close();
				};
			}
		});
	}

	return win;
};


exports.createView = function(dict) {
	var defaults = {
		height: Ti.UI.SIZE,
		touchEnabled: !isAndroid
	};

	var properties = _extend(defaults, dict);
	var view = Ti.UI.createView(properties);
	return view;
}


exports.createLabel = function(dict) {
	var defaults = {
		color: "#000000",
		touchEnabled: !isAndroid
	};

	var properties = _extend(defaults, dict);
	var label = Ti.UI.createLabel(properties);
	return label;
}


exports.createButton = function(dict) {
	var defaults = {};
	var properties = _extend(defaults, dict);
	var button = Ti.UI.createButton(properties);
	return button;
}


exports.createSearchBar = function(dict, defaultEvents) {
	var defaults = {
		barColor: BAR_COLOR,
		height: 44
	};

	var properties = _extend(defaults, dict);
	var searchBar = Ti.UI.createSearchBar(properties);

	if (typeof defaultEvents === "undefined" || defaultEvents === true) {
		searchBar.addEventListener("focus", function() {
			this.setShowCancel(true, { animated: true });
		});

		searchBar.addEventListener("blur", function() {
			this.setShowCancel(false, { animated: true });
		});

		searchBar.addEventListener("cancel", function() {
			this.blur();
		});
	}

	return searchBar;
}


exports.createTableView = function(dict) {
	var defaults = {};
	var properties = _extend(defaults, dict);
	var tableView = Ti.UI.createTableView(properties);
	return tableView;
}


exports.createTableViewSection = function(dict) {
	var defaults = {};
	var properties = _extend(defaults, dict);
	var tableViewSection = Ti.UI.createTableViewSection(properties);
	return tableViewSection;
}


exports.createTableViewRow = function(dict) {
	var dict = dict || {};
	var defaults = {
		color: "#000",
		height: 50,
		selectedBackgroundColor: "#DDD"
	};

	var properties = _extend(defaults, dict);

	// Always remove hasChild from TableViewRow when is Android
	if (isAndroid) {
		properties.hasChild = false;
	}

	return Ti.UI.createTableViewRow(properties);
}


exports.createImageView = function(dict) {
	var defaults = {};
	var properties = _extend(defaults, dict);
	var imageView = Ti.UI.createImageView(properties);
	return imageView;
}


// Method that creates a cached ImageView. It will save
// image into device Cache directory. If needs to create a thumb
// you just have to use dict.thumb as true. Obj paramater in this
// case is a ImageView, that can be configured as you like.
exports.createCachedImage = function(obj, dict) {
	var url = dict.image.replace(/\ /g, "")
	var dir = "images"
	var thumbPrefix = "thumb-"
	var filename = dict.image.split('/');
	filename = filename[filename.length - 1];

	// Default Properties
	obj.preventDefaultImage = true;
	obj.hires = true;

	if (!dict.placeholder != null || dict.placeholder == true) {
		obj.image = "/images/Placeholder.png";
	}

	var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory, dir, filename);
	if (f.exists()) {
		// Thumb generating, if its required to image
		if (dict.thumb == true) {
			var thumbFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory, dir, thumbPrefix + filename);
			if (!thumbFile.exists()) {
				var blobFile = f.read();
				thumbFile.write( blobFile.imageAsThumbnail(200) );
			}

			obj.image = thumbFile.nativePath;
			thumbFile = null;
		} else {
			obj.image = f.nativePath;
		}

		obj.isLoaded = true;
		obj.fireEvent("imageLoaded");

		// Clean File from memory
		f = null;
	} else {
		// Create images directory, if necessary
		var d = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory, dir);
		if (!d.exists()) d.createDirectory();

		obj.isLoaded = false;

		var xhr = Ti.Network.createHTTPClient({
			timeout: 120000
		});

		xhr.onload = function() {
			if (xhr.status == 200) {
				// Write file, if it exists
				f.write(xhr.responseData);

				// Thumb generating, if its required to image
				if (dict.thumb == true) {
					var thumbFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory, dir, thumbPrefix + filename);
					if (!thumbFile.exists()) {
						thumbFile.write( xhr.responseData.imageAsThumbnail(200) );
					}

					obj.image = thumbFile.nativePath;
					thumbFile = null;
				} else {
					obj.image = f.nativePath;
				}

				obj.isLoaded = true;
				obj.fireEvent("imageLoaded");

				f = null;
			}
		};

		xhr.open("GET", url);
		xhr.send();
	}
};


exports.createMapView = function(dict) {
	var defaults = {
		animate: true
	};

	var properties = _extend(defaults, dict);
	var mapView = Map.createView(properties);
	return mapView;
}


exports.createAnnotation = function(dict) {
	var defaults = {};
	var properties = _extend(defaults, dict);
	return Map.createAnnotation(properties);
}