// ------------------------------------------------------------------------------------------
//
// Berti Golf 30.05.2012
//Mix aus mehreren Klassen/ Dateien f�r die google map api
// ProjectedOverlay.js, oms.min.js, markerclusterer.js
//
// ---------------------------------------------------------------------------------------------





// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @externs_url http://closure-compiler.googlecode.com/svn/trunk/contrib/externs/google_maps_api_v3.js
// ==/ClosureCompiler==

/**
 * @name MarkerClusterer for Google Maps v3
 * @version version 1.0
 * @author Luke Mahe
 * @fileoverview
 * The library creates and manages per-zoom-level clusters for large amounts of
 * markers.
 * <br/>
 * This is a v3 implementation of the
 * <a href="http://gmaps-utility-library-dev.googlecode.com/svn/tags/markerclusterer/"
 * >v2 MarkerClusterer</a>.
 */

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *	 http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * A Marker Clusterer that clusters markers.
 *
 * @param {google.maps.Map} map The Google map to attach to.
 * @param {Array.<google.maps.Marker>} opt_markers Optional markers to add to
 *   the cluster.
 * @param {Object} opt_options support the following options:
 *	 'gridSize': (number) The grid size of a cluster in pixels.
 *	 'maxZoom': (number) The maximum zoom level that a marker can be part of a
 *				cluster.
 *	 'zoomOnClick': (boolean) Whether the default behaviour of clicking on a
 *					cluster is to zoom into it.
 *	 'styles': (object) An object that has style properties:
 *	   'url': (string) The image url.
 *	   'height': (number) The image height.
 *	   'width': (number) The image width.
 *	   'anchor': (Array) The anchor position of the label text.
 *	   'textColor': (string) The text color.
 *	   'textSize': (number) The text size.
 * @constructor
 * @extends google.maps.OverlayView
 */
function MarkerClusterer(map, opt_markers, opt_options) {
  // MarkerClusterer implements google.maps.OverlayView interface. We use the
  // extend function to extend MarkerClusterer with google.maps.OverlayView
  // because it might not always be available when the code is defined so we
  // look for it at the last possible moment. If it doesn't exist now then
  // there is no point going ahead :)
  this.extend(MarkerClusterer, google.maps.OverlayView);
  this.map_ = map;
  this.markers_ = [];
  this.clusters_ = [];
  this.sizes = [53, 56, 66, 78, 90];
  this.styles_ = [];
  this.ready_ = false;

  var options = opt_options || {};

  this.gridSize_ = options['gridSize'] || 60;
  this.maxZoom_ = options['maxZoom'] || null;
  this.styles_ = options['styles'] || [];
  this.imagePath_ = options['imagePath'] ||
	  this.MARKER_CLUSTER_IMAGE_PATH_;
  this.imageExtension_ = options['imageExtension'] ||
	  this.MARKER_CLUSTER_IMAGE_EXTENSION_;
  this.zoomOnClick_ = options['zoomOnClick'] || true;

  this.setupStyles_();

  this.setMap(map);

  this.prevZoom_ = this.map_.getZoom();

  // Add the map event listeners
  var that = this;
  google.maps.event.addListener(this.map_, 'zoom_changed', function() {
  	var maxZoom = that.map_.mapTypes[that.map_.getMapTypeId()].maxZoom;
  	var zoom = that.map_.getZoom();
  	if (zoom < 0 || zoom > maxZoom) {
  	  return;
  	}
  
	if (that.prevZoom_ != zoom) {
	  that.prevZoom_ = that.map_.getZoom();
	  that.resetViewport();
	}
  });

  google.maps.event.addListener(this.map_, 'bounds_changed', function() {
	that.redraw();
  });

  // Finally, add the markers
  if (opt_markers && opt_markers.length) {
	this.addMarkers(opt_markers, false);
  }
}


/**
 * The marker cluster image path.
 *
 * @type {string}
 * @private
 */
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ =
	'https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/' +
	'images/m';


/**
 * The marker cluster image path.
 *
 * @type {string}
 * @private
 */
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = 'png';


/**
 * Extends a objects prototype by anothers.
 *
 * @param {Object} obj1 The object to be extended.
 * @param {Object} obj2 The object to extend with.
 * @return {Object} The new extended object.
 * @ignore
 */
MarkerClusterer.prototype.extend = function(obj1, obj2) {
  return (function(object) {
	for (property in object.prototype) {
	  this.prototype[property] = object.prototype[property];
	}
	return this;
  }).apply(obj1, [obj2]);
};


/**
 * Implementaion of the interface method.
 * @ignore
 */
MarkerClusterer.prototype.onAdd = function() {
  this.setReady_(true);
};


/**
 * Implementation of the interface.
 * @ignore
 */
MarkerClusterer.prototype.idle = function() {};


/**
 * Implementation of the interface.
 * @ignore
 */
MarkerClusterer.prototype.draw = function() {};


/**
 * Sets up the styles object.
 *
 * @private
 */
MarkerClusterer.prototype.setupStyles_ = function() {
  for (var i = 0, size; size = this.sizes[i]; i++) {
	this.styles_.push({
	  url: this.imagePath_ + (i + 1) + '.' + this.imageExtension_,
	  height: size,
	  width: size
	});
  }
};


/**
 *  Sets the styles.
 *
 *  @param {Object} styles The style to set.
 */
MarkerClusterer.prototype.setStyles = function(styles) {
  this.styles_ = styles;
};


/**
 *  Gets the styles.
 *
 *  @return {Object} The styles object.
 */
MarkerClusterer.prototype.getStyles = function() {
  return this.styles_;
};


/**
 * Whether zoom on click is set.
 *
 * @return {boolean} True if zoomOnClick_ is set.
 */
MarkerClusterer.prototype.isZoomOnClick = function() {
  return this.zoomOnClick_;
};


/**
 *  Returns the array of markers in the clusterer.
 *
 *  @return {Array.<google.maps.Marker>} The markers.
 */
MarkerClusterer.prototype.getMarkers = function() {
  return this.markers_;
};


/**
 *  Returns the array of markers in the clusterer.
 *
 *  @return {Array.<google.maps.Marker>} The number of markers.
 */
MarkerClusterer.prototype.getTotalMarkers = function() {
  return this.markers_;
};


/**
 *  Sets the max zoom for the clusterer.
 *
 *  @param {number} maxZoom The max zoom level.
 */
MarkerClusterer.prototype.setMaxZoom = function(maxZoom) {
  this.maxZoom_ = maxZoom;
};


/**
 *  Gets the max zoom for the clusterer.
 *
 *  @return {number} The max zoom level.
 */
MarkerClusterer.prototype.getMaxZoom = function() {
  return this.maxZoom_ || this.map_.mapTypes[this.map_.getMapTypeId()].maxZoom;
};


/**
 *  The function for calculating the cluster icon image.
 *
 *  @param {Array.<google.maps.Marker>} markers The markers in the clusterer.
 *  @param {number} numStyles The number of styles available.
 *  @return {Object} A object properties: 'text' (string) and 'index' (number).
 *  @private
 */
MarkerClusterer.prototype.calculator_ = function(markers, numStyles) {
  var index = 0;
  var count = markers.length;
  var dv = count;
  while (dv !== 0) {
	dv = parseInt(dv / 10, 10);
	index++;
  }

  index = Math.min(index, numStyles);
  return {
	text: count,
	index: index
  };
};


/**
 * Set the calculator function.
 *
 * @param {function(Array, number)} calculator The function to set as the
 *	 calculator. The function should return a object properties:
 *	 'text' (string) and 'index' (number).
 *
 */
MarkerClusterer.prototype.setCalculator = function(calculator) {
  this.calculator_ = calculator;
};


/**
 * Get the calculator function.
 *
 * @return {function(Array, number)} the calculator function.
 */
MarkerClusterer.prototype.getCalculator = function() {
  return this.calculator_;
};


/**
 * Add an array of markers to the clusterer.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to add.
 * @param {boolean} opt_nodraw Whether to redraw the clusters.
 */
MarkerClusterer.prototype.addMarkers = function(markers, opt_nodraw) {
  for (var i = 0, marker; marker = markers[i]; i++) {
	this.pushMarkerTo_(marker);
  }
  if (!opt_nodraw) {
	this.redraw();
  }
};


/**
 * Pushes a marker to the clusterer.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @private
 */
MarkerClusterer.prototype.pushMarkerTo_ = function(marker) {
  marker.setVisible(false);
  marker.setMap(null);
  marker.isAdded = false;
  if (marker['draggable']) {
	// If the marker is draggable add a listener so we update the clusters on
	// the drag end.
	var that = this;
	google.maps.event.addListener(marker, 'dragend', function() {
	  marker.isAdded = false;
	  that.resetViewport();
	  that.redraw();
	});
  }
  this.markers_.push(marker);
};


/**
 * Adds a marker to the clusterer and redraws if needed.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @param {boolean} opt_nodraw Whether to redraw the clusters.
 */
MarkerClusterer.prototype.addMarker = function(marker, opt_nodraw) {
  this.pushMarkerTo_(marker);
  if (!opt_nodraw) {
	this.redraw();
  }
};


/**
 * Remove a marker from the cluster.
 *
 * @param {google.maps.Marker} marker The marker to remove.
 * @return {boolean} True if the marker was removed.
 */
MarkerClusterer.prototype.removeMarker = function(marker) {
  var index = -1;
  if (this.markers_.indexOf) {
	index = this.markers_.indexOf(marker);
  } else {
	for (var i = 0, m; m = this.markers_[i]; i++) {
	  if (m == marker) {
		index = i;
		continue;
	  }
	}
  }

  if (index == -1) {
	// Marker is not in our list of markers.
	return false;
  }

  this.markers_.splice(index, 1);
  marker.setVisible(false);
  marker.setMap(null);

  this.resetViewport();
  this.redraw();
  return true;
};


/**
 * Sets the clusterer's ready state.
 *
 * @param {boolean} ready The state.
 * @private
 */
MarkerClusterer.prototype.setReady_ = function(ready) {
  if (!this.ready_) {
	this.ready_ = ready;
	this.createClusters_();
  }
};


/**
 * Returns the number of clusters in the clusterer.
 *
 * @return {number} The number of clusters.
 */
MarkerClusterer.prototype.getTotalClusters = function() {
  return this.clusters_.length;
};


/**
 * Returns the google map that the clusterer is associated with.
 *
 * @return {google.maps.Map} The map.
 */
MarkerClusterer.prototype.getMap = function() {
  return this.map_;
};


/**
 * Sets the google map that the clusterer is associated with.
 *
 * @param {google.maps.Map} map The map.
 */
MarkerClusterer.prototype.setMap = function(map) {
  this.map_ = map;
};


/**
 * Returns the size of the grid.
 *
 * @return {number} The grid size.
 */
MarkerClusterer.prototype.getGridSize = function() {
  return this.gridSize_;
};


/**
 * Returns the size of the grid.
 *
 * @param {number} size The grid size.
 */
MarkerClusterer.prototype.setGridSize = function(size) {
  this.gridSize_ = size;
};


/**
 * Extends a bounds object by the grid size.
 *
 * @param {google.maps.LatLngBounds} bounds The bounds to extend.
 * @return {google.maps.LatLngBounds} The extended bounds.
 */
MarkerClusterer.prototype.getExtendedBounds = function(bounds) {
  var projection = this.getProjection();

  // Turn the bounds into latlng.
  var tr = new google.maps.LatLng(bounds.getNorthEast().lat(),
	  bounds.getNorthEast().lng());
  var bl = new google.maps.LatLng(bounds.getSouthWest().lat(),
	  bounds.getSouthWest().lng());

  // Convert the points to pixels and the extend out by the grid size.
  var trPix = projection.fromLatLngToDivPixel(tr);
  trPix.x += this.gridSize_;
  trPix.y -= this.gridSize_;

  var blPix = projection.fromLatLngToDivPixel(bl);
  blPix.x -= this.gridSize_;
  blPix.y += this.gridSize_;

  // Convert the pixel points back to LatLng
  var ne = projection.fromDivPixelToLatLng(trPix);
  var sw = projection.fromDivPixelToLatLng(blPix);

  // Extend the bounds to contain the new bounds.
  bounds.extend(ne);
  bounds.extend(sw);

  return bounds;
};


/**
 * Determins if a marker is contained in a bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @param {google.maps.LatLngBounds} bounds The bounds to check against.
 * @return {boolean} True if the marker is in the bounds.
 * @private
 */
MarkerClusterer.prototype.isMarkerInBounds_ = function(marker, bounds) {
  return bounds.contains(marker.getPosition());
};


/**
 * Clears all clusters and markers from the clusterer.
 */
MarkerClusterer.prototype.clearMarkers = function() {
  this.resetViewport();

  // Set the markers a empty array.
  this.markers_ = [];
};


/**
 * Clears all existing clusters and recreates them.
 */
MarkerClusterer.prototype.resetViewport = function() {
  // Remove all the clusters
  for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
	cluster.remove();
  }

  // Reset the markers to not be added and to be invisible.
  for (var i = 0, marker; marker = this.markers_[i]; i++) {
	marker.isAdded = false;
	marker.setMap(null);
	marker.setVisible(false);
  }

  this.clusters_ = [];
};


/**
 * Redraws the clusters.
 */
MarkerClusterer.prototype.redraw = function() {
  this.createClusters_();
};


/**
 * Creates the clusters.
 *
 * @private
 */
MarkerClusterer.prototype.createClusters_ = function() {
  if (!this.ready_) {
	return;
  }

  // Get our current map view bounds.
  // Create a new bounds object so we don't affect the map.
  var mapBounds = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(),
	  this.map_.getBounds().getNorthEast());
  var bounds = this.getExtendedBounds(mapBounds);

  for (var i = 0, marker; marker = this.markers_[i]; i++) {
	var added = false;
	if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
	  for (var j = 0, cluster; cluster = this.clusters_[j]; j++) {
		if (!added && cluster.getCenter() &&
			cluster.isMarkerInClusterBounds(marker)) {
		  added = true;
		  cluster.addMarker(marker);
		  break;
		}
	  }

	  if (!added) {
		// Create a new cluster.
		var cluster = new Cluster(this);
		cluster.addMarker(marker);
		this.clusters_.push(cluster);
	  }
	}
  }
};


/**
 * A cluster that contains markers.
 *
 * @param {MarkerClusterer} markerClusterer The markerclusterer that this
 *	 cluster is associated with.
 * @constructor
 * @ignore
 */
function Cluster(markerClusterer) {
  this.markerClusterer_ = markerClusterer;
  this.map_ = markerClusterer.getMap();
  this.gridSize_ = markerClusterer.getGridSize();
  this.center_ = null;
  this.markers_ = [];
  this.bounds_ = null;
  this.clusterIcon_ = new ClusterIcon(this, markerClusterer.getStyles(),
	  markerClusterer.getGridSize());
}


/**
 * Determins if a marker is already added to the cluster.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker is already added.
 */
Cluster.prototype.isMarkerAlreadyAdded = function(marker) {
  if (this.markers_.indexOf) {
	return this.markers_.indexOf(marker) != -1;
  } else {
	for (var i = 0, m; m = this.markers_[i]; i++) {
	  if (m == marker) {
		return true;
	  }
	}
  }
  return false;
};


/**
 * Add a marker the cluster.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @return {boolean} True if the marker was added.
 */
Cluster.prototype.addMarker = function(marker) {
  if (this.isMarkerAlreadyAdded(marker)) {
	return false;
  }

  if (!this.center_) {
	this.center_ = marker.getPosition();
	this.calculateBounds_();
  }

  if (this.markers_.length == 0) {
	// Only 1 marker in this cluster so show the marker.
	marker.setMap(this.map_);
	marker.setVisible(true);
  } else if (this.markers_.length == 1) {
	// Hide the 1 marker that was showing.
	this.markers_[0].setMap(null);
	this.markers_[0].setVisible(false);
  }

  marker.isAdded = true;
  this.markers_.push(marker);

  this.updateIcon();
  return true;
};


/**
 * Returns the marker clusterer that the cluster is associated with.
 *
 * @return {MarkerClusterer} The associated marker clusterer.
 */
Cluster.prototype.getMarkerClusterer = function() {
  return this.markerClusterer_;
};


/**
 * Returns the bounds of the cluster.
 *
 * @return {google.maps.LatLngBounds} the cluster bounds.
 */
Cluster.prototype.getBounds = function() {
  this.calculateBounds_();
  return this.bounds_;
};


/**
 * Removes the cluster
 */
Cluster.prototype.remove = function() {
  this.clusterIcon_.remove();
  delete this.markers_;
};


/**
 * Returns the center of the cluster.
 *
 * @return {google.maps.LatLng} The cluster center.
 */
Cluster.prototype.getCenter = function() {
  return this.center_;
};


/**
 * Calculated the bounds of the cluster with the grid.
 *
 * @private
 */
Cluster.prototype.calculateBounds_ = function() {
  var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
  this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
};


/**
 * Determines if a marker lies in the clusters bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker lies in the bounds.
 */
Cluster.prototype.isMarkerInClusterBounds = function(marker) {
  return this.bounds_.contains(marker.getPosition());
};


/**
 * Returns the map that the cluster is associated with.
 *
 * @return {google.maps.Map} The map.
 */
Cluster.prototype.getMap = function() {
  return this.map_;
};


/**
 * Updates the cluster icon
 */
Cluster.prototype.updateIcon = function() {
  var zoom = this.map_.getZoom();
  var mz = this.markerClusterer_.getMaxZoom();

  if (zoom > mz) {
	// The zoom is greater than our max zoom so show all the markers in cluster.
	for (var i = 0, marker; marker = this.markers_[i]; i++) {
	  marker.setMap(this.map_);
	  marker.setVisible(true);
	}
	return;
  }

  if (this.markers_.length < 2) {
	// We have 0 or 1 markers so hide the icon.
	this.clusterIcon_.hide();
	return;
  }

  var numStyles = this.markerClusterer_.getStyles().length;
  var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
  this.clusterIcon_.setCenter(this.center_);
  this.clusterIcon_.setSums(sums);
  this.clusterIcon_.show();
};


/**
 * A cluster icon
 *
 * @param {Cluster} cluster The cluster to be associated with.
 * @param {Object} styles An object that has style properties:
 *	 'url': (string) The image url.
 *	 'height': (number) The image height.
 *	 'width': (number) The image width.
 *	 'anchor': (Array) The anchor position of the label text.
 *	 'textColor': (string) The text color.
 *	 'textSize': (number) The text size.
 * @param {number} opt_padding Optional padding to apply to the cluster icon.
 * @constructor
 * @extends google.maps.OverlayView
 * @ignore
 */
function ClusterIcon(cluster, styles, opt_padding) {
  cluster.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);

  this.styles_ = styles;
  this.padding_ = opt_padding || 0;
  this.cluster_ = cluster;
  this.center_ = null;
  this.map_ = cluster.getMap();
  this.div_ = null;
  this.sums_ = null;
  this.visible_ = false;

  this.setMap(this.map_);
}


/**
 * Triggers the clusterclick event and zoom's if the option is set.
 */
ClusterIcon.prototype.triggerClusterClick = function() {
  var markerClusterer = this.cluster_.getMarkerClusterer();

  // Trigger the clusterclick event.
  google.maps.event.trigger(markerClusterer, 'clusterclick', [this.cluster_]);

  if (markerClusterer.isZoomOnClick()) {
	// Center the map on this cluster.
	this.map_.panTo(this.cluster_.getCenter());

	// Zoom into the cluster.
	this.map_.fitBounds(this.cluster_.getBounds());
  }
};


/**
 * Adding the cluster icon to the dom.
 * @ignore
 */
ClusterIcon.prototype.onAdd = function() {
  this.div_ = document.createElement('DIV');
  if (this.visible_) {
	var pos = this.getPosFromLatLng_(this.center_);
	this.div_.style.cssText = this.createCss(pos);
	this.div_.innerHTML = this.sums_.text;
  }

  var panes = this.getPanes();
  panes.overlayImage.appendChild(this.div_);

  var that = this;
  google.maps.event.addDomListener(this.div_, 'click', function() {
	that.triggerClusterClick();
  });
};


/**
 * Returns the position to place the div dending on the latlng.
 *
 * @param {google.maps.LatLng} latlng The position in latlng.
 * @return {google.maps.Point} The position in pixels.
 * @private
 */
ClusterIcon.prototype.getPosFromLatLng_ = function(latlng) {
  var pos = this.getProjection().fromLatLngToDivPixel(latlng);
  pos.x -= parseInt(this.width_ / 2, 10);
  pos.y -= parseInt(this.height_ / 2, 10);
  return pos;
};


/**
 * Draw the icon.
 * @ignore
 */
ClusterIcon.prototype.draw = function() {
  if (this.visible_) {
	var pos = this.getPosFromLatLng_(this.center_);
	this.div_.style.top = pos.y + 'px';
	this.div_.style.left = pos.x + 'px';
  }
};


/**
 * Hide the icon.
 */
ClusterIcon.prototype.hide = function() {
  if (this.div_) {
	this.div_.style.display = 'none';
  }
  this.visible_ = false;
};


/**
 * Position and show the icon.
 */
ClusterIcon.prototype.show = function() {
  if (this.div_) {
	var pos = this.getPosFromLatLng_(this.center_);
	this.div_.style.cssText = this.createCss(pos);
	this.div_.style.display = '';
  }
  this.visible_ = true;
};


/**
 * Remove the icon from the map
 */
ClusterIcon.prototype.remove = function() {
  this.setMap(null);
};


/**
 * Implementation of the onRemove interface.
 * @ignore
 */
ClusterIcon.prototype.onRemove = function() {
  if (this.div_ && this.div_.parentNode) {
	this.hide();
	this.div_.parentNode.removeChild(this.div_);
	this.div_ = null;
  }
};


/**
 * Set the sums of the icon.
 *
 * @param {Object} sums The sums containing:
 *   'text': (string) The text to display in the icon.
 *   'index': (number) The style index of the icon.
 */
ClusterIcon.prototype.setSums = function(sums) {
  this.sums_ = sums;
  this.text_ = sums.text;
  this.index_ = sums.index;
  if (this.div_) {
	this.div_.innerHTML = sums.text;
  }

  this.useStyle();
};


/**
 * Sets the icon to the the styles.
 */
ClusterIcon.prototype.useStyle = function() {
  var index = Math.max(0, this.sums_.index - 1);
  index = Math.min(this.styles_.length - 1, index);
  var style = this.styles_[index];
  this.url_ = style.url;
  this.height_ = style.height;
  this.width_ = style.width;
  this.textColor_ = style.opt_textColor;
  this.anchor = style.opt_anchor;
  this.textSize_ = style.opt_textSize;
};


/**
 * Sets the center of the icon.
 *
 * @param {google.maps.LatLng} center The latlng to set as the center.
 */
ClusterIcon.prototype.setCenter = function(center) {
  this.center_ = center;
};


/**
 * Create the css text based on the position of the icon.
 *
 * @param {google.maps.Point} pos The position.
 * @return {string} The css style text.
 */
ClusterIcon.prototype.createCss = function(pos) {
  var style = [];
  if (document.all) {
	style.push('filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(' +
		'sizingMethod=scale,src="' + this.url_ + '");');
  } else {
	style.push('background:url(' + this.url_ + ');');
  }

  if (typeof this.anchor_ === 'object') {
	if (typeof this.anchor_[0] === 'number' && this.anchor_[0] > 0 &&
		this.anchor_[0] < this.height_) {
	  style.push('height:' + (this.height_ - this.anchor_[0]) +
		  'px; padding-top:' + this.anchor_[0] + 'px;');
	} else {
	  style.push('height:' + this.height_ + 'px; line-height:' + this.height_ +
		  'px;');
	}
	if (typeof this.anchor_[1] === 'number' && this.anchor_[1] > 0 &&
		this.anchor_[1] < this.width_) {
	  style.push('width:' + (this.width_ - this.anchor_[1]) +
		  'px; padding-left:' + this.anchor_[1] + 'px;');
	} else {
	  style.push('width:' + this.width_ + 'px; text-align:center;');
	}
  } else {
	style.push('height:' + this.height_ + 'px; line-height:' +
		this.height_ + 'px; width:' + this.width_ + 'px; text-align:center;');
  }

  var txtColor = this.textColor_ ? this.textColor_ : 'black';
  var txtSize = this.textSize_ ? this.textSize_ : 11;

  style.push('cursor:pointer; top:' + pos.y + 'px; left:' +
	  pos.x + 'px; color:' + txtColor + '; position:absolute; font-size:' +
	  txtSize + 'px; font-family:Arial,sans-serif; font-weight:bold');
  return style.join('');
};


// Export Symbols for Closure
// If you are not going to compile with closure then you can remove the
// code below.
window['MarkerClusterer'] = MarkerClusterer;
MarkerClusterer.prototype['addMarker'] = MarkerClusterer.prototype.addMarker;
MarkerClusterer.prototype['addMarkers'] = MarkerClusterer.prototype.addMarkers;
MarkerClusterer.prototype['clearMarkers'] =
	MarkerClusterer.prototype.clearMarkers;
MarkerClusterer.prototype['getCalculator'] =
	MarkerClusterer.prototype.getCalculator;
MarkerClusterer.prototype['getGridSize'] =
	MarkerClusterer.prototype.getGridSize;
MarkerClusterer.prototype['getMap'] = MarkerClusterer.prototype.getMap;
MarkerClusterer.prototype['getMarkers'] = MarkerClusterer.prototype.getMarkers;
MarkerClusterer.prototype['getMaxZoom'] = MarkerClusterer.prototype.getMaxZoom;
MarkerClusterer.prototype['getStyles'] = MarkerClusterer.prototype.getStyles;
MarkerClusterer.prototype['getTotalClusters'] =
	MarkerClusterer.prototype.getTotalClusters;
MarkerClusterer.prototype['getTotalMarkers'] =
	MarkerClusterer.prototype.getTotalMarkers;
MarkerClusterer.prototype['redraw'] = MarkerClusterer.prototype.redraw;
MarkerClusterer.prototype['removeMarker'] =
	MarkerClusterer.prototype.removeMarker;
MarkerClusterer.prototype['resetViewport'] =
	MarkerClusterer.prototype.resetViewport;
MarkerClusterer.prototype['setCalculator'] =
	MarkerClusterer.prototype.setCalculator;
MarkerClusterer.prototype['setGridSize'] =
	MarkerClusterer.prototype.setGridSize;
MarkerClusterer.prototype['onAdd'] = MarkerClusterer.prototype.onAdd;
MarkerClusterer.prototype['draw'] = MarkerClusterer.prototype.draw;
MarkerClusterer.prototype['idle'] = MarkerClusterer.prototype.idle;

ClusterIcon.prototype['onAdd'] = ClusterIcon.prototype.onAdd;
ClusterIcon.prototype['draw'] = ClusterIcon.prototype.draw;
ClusterIcon.prototype['onRemove'] = ClusterIcon.prototype.onRemove;




// Overlapping Marker Spiderfier for Google Maps API v3
//
//https://github.com/jawj/OverlappingMarkerSpiderfier
//
//
(function(){/*
 OverlappingMarkerSpiderfier
https://github.com/jawj/OverlappingMarkerSpiderfier
Copyright (c) 2011 - 2012 George MacKerron
Released under the MIT licence: http://opensource.org/licenses/mit-license
Note: The Google Maps API v3 must be included *before* this code
*/
var h=null;
(function(){var s,t={}.hasOwnProperty,u=[].slice;if(((s=this.google)!=h?s.maps:void 0)!=h)this.OverlappingMarkerSpiderfier=function(){function o(b,d){var a,g,e,f,c=this;this.map=b;d==h&&(d={});for(a in d)t.call(d,a)&&(g=d[a],this[a]=g);this.m=new this.constructor.c(this.map);this.i();this.b={};f=["click","zoom_changed","maptypeid_changed"];g=0;for(e=f.length;g<e;g++)a=f[g],l.addListener(this.map,a,function(){return c.unspiderfy()})}var l,p,n,q,k,c,r;c=o.prototype;c.VERSION="0.2.6";p=google.maps;l=
p.event;k=p.MapTypeId;r=2*Math.PI;c.keepSpiderfied=!1;c.markersWontHide=!1;c.markersWontMove=!1;c.nearbyDistance=20;c.circleSpiralSwitchover=9;c.circleFootSeparation=23;c.circleStartAngle=r/12;c.spiralFootSeparation=26;c.spiralLengthStart=11;c.spiralLengthFactor=4;c.spiderfiedZIndex=1E3;c.usualLegZIndex=10;c.highlightedLegZIndex=20;c.legWeight=1.5;c.legColors={usual:{},highlighted:{}};q=c.legColors.usual;n=c.legColors.highlighted;q[k.HYBRID]=q[k.SATELLITE]="#fff";n[k.HYBRID]=n[k.SATELLITE]="#f00";
q[k.TERRAIN]=q[k.ROADMAP]="#444";n[k.TERRAIN]=n[k.ROADMAP]="#f00";c.i=function(){this.a=[];this.f=[]};c.addMarker=function(b){var d,a=this;if(b._oms!=h)return this;b._oms=!0;d=[l.addListener(b,"click",function(){return a.B(b)})];this.markersWontHide||d.push(l.addListener(b,"visible_changed",function(){return a.k(b,!1)}));this.markersWontMove||d.push(l.addListener(b,"position_changed",function(){return a.k(b,!0)}));this.f.push(d);this.a.push(b);return this};c.k=function(b,d){if(b._omsData!=h&&(d||
!b.getVisible())&&!(this.p!=h||this.q!=h))return this.F(d?b:h)};c.getMarkers=function(){return this.a.slice(0)};c.removeMarker=function(b){var d,a,g,e,f;b._omsData!=h&&this.unspiderfy();d=this.h(this.a,b);if(0>d)return this;g=this.f.splice(d,1)[0];e=0;for(f=g.length;e<f;e++)a=g[e],l.removeListener(a);delete b._oms;this.a.splice(d,1);return this};c.clearMarkers=function(){var b,d,a,g,e,f,c,i;this.unspiderfy();i=this.a;b=g=0;for(f=i.length;g<f;b=++g){a=i[b];d=this.f[b];e=0;for(c=d.length;e<c;e++)b=
d[e],l.removeListener(b);delete a._oms}this.i();return this};c.addListener=function(b,d){var a,g;((g=(a=this.b)[b])!=h?g:a[b]=[]).push(d);return this};c.removeListener=function(b,d){var a;a=this.h(this.b[b],d);0>a||this.b[b].splice(a,1);return this};c.clearListeners=function(b){this.b[b]=[];return this};c.trigger=function(){var b,d,a,g,e,f;d=arguments[0];b=2<=arguments.length?u.call(arguments,1):[];d=(a=this.b[d])!=h?a:[];f=[];g=0;for(e=d.length;g<e;g++)a=d[g],f.push(a.apply(h,b));return f};c.r=function(b,
d){var a,g,e,f,c;e=this.circleFootSeparation*(2+b)/r;g=r/b;c=[];for(a=f=0;0<=b?f<b:f>b;a=0<=b?++f:--f)a=this.circleStartAngle+a*g,c.push(new p.Point(d.x+e*Math.cos(a),d.y+e*Math.sin(a)));return c};c.s=function(b,d){var a,g,e,c,j;e=this.spiralLengthStart;a=0;j=[];for(g=c=0;0<=b?c<b:c>b;g=0<=b?++c:--c)a+=this.spiralFootSeparation/e+5.0E-4*g,g=new p.Point(d.x+e*Math.cos(a),d.y+e*Math.sin(a)),e+=r*this.spiralLengthFactor/a,j.push(g);return j};c.B=function(b){var d,a,g,c,f,j,i,m,l;d=b._omsData!=h;(!d||
!this.keepSpiderfied)&&this.unspiderfy();if(d||this.map.getStreetView().getVisible())return this.trigger("click",b);c=[];f=[];j=this.nearbyDistance*this.nearbyDistance;g=this.j(b.position);l=this.a;i=0;for(m=l.length;i<m;i++)d=l[i],d.getVisible()&&d.map!=h&&(a=this.j(d.position),this.n(a,g)<j?c.push({v:d,l:a}):f.push(d));return 1===c.length?this.trigger("click",b):this.C(c,f)};c.u=function(b){var d=this;return{d:function(){return b._omsData.e.setOptions({strokeColor:d.legColors.highlighted[d.map.mapTypeId],
zIndex:d.highlightedLegZIndex})},g:function(){return b._omsData.e.setOptions({strokeColor:d.legColors.usual[d.map.mapTypeId],zIndex:d.usualLegZIndex})}}};c.C=function(b,d){var a,c,e,f,j,i,m,k,o,n;this.p=!0;n=b.length;a=this.z(function(){var a,d,c;c=[];a=0;for(d=b.length;a<d;a++)k=b[a],c.push(k.l);return c}());f=n>=this.circleSpiralSwitchover?this.s(n,a).reverse():this.r(n,a);a=function(){var a,d,k,n=this;k=[];a=0;for(d=f.length;a<d;a++)e=f[a],c=this.A(e),o=this.w(b,function(a){return n.n(a.l,e)}),
m=o.v,i=new p.Polyline({map:this.map,path:[m.position,c],strokeColor:this.legColors.usual[this.map.mapTypeId],strokeWeight:this.legWeight,zIndex:this.usualLegZIndex}),m._omsData={D:m.position,e:i},this.legColors.highlighted[this.map.mapTypeId]!==this.legColors.usual[this.map.mapTypeId]&&(j=this.u(m),m._omsData.t={d:l.addListener(m,"mouseover",j.d),g:l.addListener(m,"mouseout",j.g)}),m.setPosition(c),m.setZIndex(Math.round(this.spiderfiedZIndex+e.y)),k.push(m);return k}.call(this);delete this.p;this.o=
!0;return this.trigger("spiderfy",a,d)};c.unspiderfy=function(b){var d,a,c,e,f,j,i;b==h&&(b=h);if(this.o==h)return this;this.q=!0;e=[];c=[];i=this.a;f=0;for(j=i.length;f<j;f++)a=i[f],a._omsData!=h?(a._omsData.e.setMap(h),a!==b&&a.setPosition(a._omsData.D),a.setZIndex(h),d=a._omsData.t,d!=h&&(l.removeListener(d.d),l.removeListener(d.g)),delete a._omsData,e.push(a)):c.push(a);delete this.q;delete this.o;this.trigger("unspiderfy",e,c);return this};c.n=function(b,d){var a,c;a=b.x-d.x;c=b.y-d.y;return a*
a+c*c};c.z=function(b){var d,a,c,e,f;e=a=c=0;for(f=b.length;e<f;e++)d=b[e],a+=d.x,c+=d.y;b=b.length;return new p.Point(a/b,c/b)};c.j=function(b){return this.m.getProjection().fromLatLngToDivPixel(b)};c.A=function(b){return this.m.getProjection().fromDivPixelToLatLng(b)};c.w=function(b,c){var a,g,e,f,j,i;e=j=0;for(i=b.length;j<i;e=++j)if(f=b[e],f=c(f),!("undefined"!==typeof a&&a!==h)||f<g)g=f,a=e;return b.splice(a,1)[0]};c.h=function(b,c){var a,g,e,f;if(b.indexOf!=h)return b.indexOf(c);a=e=0;for(f=
b.length;e<f;a=++e)if(g=b[a],g===c)return a;return-1};o.c=function(b){return this.setMap(b)};o.c.prototype=new p.OverlayView;o.c.prototype.draw=function(){};return o}()}).call(this);}).call(this);
/* Thu 17 May 2012 12:12:01 BST */








// ------------------------------------------------------------------------------------------

// ProjectedOverlay.js
//http://code.google.com/p/geoxml3/source/browse/trunk/ProjectedOverlay.js

// Create an overlay on the map from a projected image - Maps v3...
// Author. John D. Coryat 05/2009
// USNaviguide LLC - http://www.usnaviguide.com
// Thanks go to Mile Williams EInsert: http://econym.googlepages.com/einsert.js, Google's GOverlay Example and Bratliff's suggestion...
// Opacity code from TPhoto: http://gmaps.tommangan.us/addtphoto.html
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA.
//
// Parameters:
//	map: This Map
//	imageUrl: URL of the image (Mandatory)
//	bounds: Bounds object of image destination (Mandatory)
//	Options:
//	addZoom: Added Zoom factor as a parameter to the imageUrl (include complete parameter, including separater like '?zoom='
//	percentOpacity: Default 50, percent opacity to use when the image is loaded 0-100.
//	id: Default imageUrl, ID of the div
//

function ProjectedOverlay(map, imageUrl, bounds, opts)
{
 google.maps.OverlayView.call(this);

 this.map_ = map;
 this.url_ = imageUrl ;
 this.bounds_ = bounds ;
 this.addZ_ = opts.addZoom || '' ;				// Add the zoom to the image as a parameter
 this.id_ = opts.id || this.url_ ;				// Added to allow for multiple images
 this.percentOpacity_ = opts.percentOpacity || 50 ;

 this.setMap(map);
}

ProjectedOverlay.prototype = new google.maps.OverlayView();

ProjectedOverlay.prototype.createElement = function()
{
 var panes = this.getPanes() ;
 var div = this.div_ ;

 if (!div)
 {
  div = this.div_ = document.createElement("div");
  div.style.position = "absolute" ;
  div.setAttribute('id',this.id_) ;
  this.div_ = div ;
  this.lastZoom_ = -1 ;
  if( this.percentOpacity_ )
  {
   this.setOpacity(this.percentOpacity_) ;
  }
  panes.overlayLayer.appendChild(div);
 }
}

// Remove the main DIV from the map pane

ProjectedOverlay.prototype.remove = function()
{
 if (this.div_) 
 {
  this.setMap(null);
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
 }
}

// Redraw based on the current projection and zoom level...

ProjectedOverlay.prototype.draw = function(firstTime)
{
 // Creates the element if it doesn't exist already.

 this.createElement();

 if (!this.div_)
 {
  return ;
 }

 var c1 = this.get('projection').fromLatLngToDivPixel(this.bounds_.getSouthWest());
 var c2 = this.get('projection').fromLatLngToDivPixel(this.bounds_.getNorthEast());

 if (!c1 || !c2) return;

 // Now position our DIV based on the DIV coordinates of our bounds

 this.div_.style.width = Math.abs(c2.x - c1.x) + "px";
 this.div_.style.height = Math.abs(c2.y - c1.y) + "px";
 this.div_.style.left = Math.min(c2.x, c1.x) + "px";
 this.div_.style.top = Math.min(c2.y, c1.y) + "px";

 // Do the rest only if the zoom has changed...
 
 if ( this.lastZoom_ == this.map_.getZoom() )
 {
  return ;
 }

 this.lastZoom_ = this.map_.getZoom() ;

 var url = this.url_ ;

 if ( this.addZ_ )
 {
  url += this.addZ_ + this.map_.getZoom() ;
 }

 this.div_.innerHTML = '<img src="' + url + '"  width=' + this.div_.style.width + ' height=' + this.div_.style.height + ' >' ;
}

ProjectedOverlay.prototype.setOpacity=function(opacity)
{
 if (opacity < 0)
 {
  opacity = 0 ;
 }
 if(opacity > 100)
 {
  opacity = 100 ;
 }
 var c = opacity/100 ;

 if (typeof(this.div_.style.filter) =='string')
 {
  this.div_.style.filter = 'alpha(opacity:' + opacity + ')' ;
 }
 if (typeof(this.div_.style.KHTMLOpacity) == 'string' )
 {
  this.div_.style.KHTMLOpacity = c ;
 }
 if (typeof(this.div_.style.MozOpacity) == 'string')
 {
  this.div_.style.MozOpacity = c ;
 }
 if (typeof(this.div_.style.opacity) == 'string')
 {
  this.div_.style.opacity = c ;
 }
}


// ************************************************************************************************
// eigener Code
	var directionDisplay;
	var directionsService = new google.maps.DirectionsService();
	var map;
	var startPosition = new google.maps.LatLng(48.17587, 11.5235755);
	var meinePosition = new google.maps.LatLng(48.17587, 11.5235755);
	 var image = new Array(4);
		image[0] = new google.maps.MarkerImage('/fileadmin/images/test.png',
						// This marker is 38 pixels wide by 45 pixels tall.
					  new google.maps.Size(38, 45),
					  // The origin for this image is 0,0.
					  new google.maps.Point(0,0),
					  // The anchor for this image is the base of the flagpole at 0,32.
					  new google.maps.Point(0, 32)
					);
		
		var myOptions = {
				center: startPosition,
				zoom: 7,
				mapTypeId: google.maps.MapTypeId.TERRAIN,
				panControl: true,
		  		zoomControl: true,
		  		zoomControlOptions: { style: google.maps.ZoomControlStyle.BIG 	},
		  		mapTypeControl: true,
		  		scaleControl: true,
		  		streetViewControl: true,
		  		overviewMapControl: true,
		  		rotateControl: true,
		  		streetViewControl: true,
		  		scrollwheel: false,
		  		rotateControl: false
			};
 
 function initializeMap() {
		// definition der map
		
	  
	  
		map = new google.maps.Map(document.getElementById("map_canvas"),  myOptions);
   
		// Zusammenfassen und Aufklappen �berlappender Marker
		var oms = new OverlappingMarkerSpiderfier(map);
		var iw = new google.maps.InfoWindow( );

		oms.addListener('click', function(marker) {
  				iw.setContent(marker.desc);
  				iw.open(map, marker);
		});
		oms.addListener('spiderfy', function(markers) {  iw.close(); });

 	
		var markers = [];
		var infowindow;

		for ( var i = 0, dataOrt; dataOrt = daten.orte[i]; i++) {
		 
		  	var latLng = new google.maps.LatLng(dataOrt.lat, dataOrt.lng);
		  	 marker = new google.maps.Marker({
				position: latLng,
		   		title: dataOrt.titel,
							animation: google.maps.Animation.DROP,
							icon: image[dataOrt.imageId],
						//	shadow: shadow,
							desc: dataOrt.info,
							map:map
		  		});
		  
		  
		 oms.addMarker(marker);
		 markers.push(marker);

		}
		var markerClusterer = new MarkerClusterer(map, markers, {maxZoom: 13});
 

							   
 } //  function initializeMap() {
 


function handleNoGeolocation(errorFlag) {
		if (errorFlag) {
		  var content = '<h3>Hinweis:</h3><p> Der Geolocation-Dienst funktioniert nicht.<br />Ihr Standort konnte nicht bestimmt werden!</p>';
		} else {
		  var content = '<h3>Hinweis:</h3><p>Ihr Browser unterst�tzt  "Geolocation" nicht.<br />Ihr Standort konnte nicht bestimmt werden!</p>';
		}
  var Image = new google.maps.MarkerImage('https://db.blsv.de/images/qualinet2012/myposition.png',
				  // This marker is 12 pixels wide by 12 pixels tall.
				  new google.maps.Size(12, 12),
				  // The origin for this image is 0,0.
				  new google.maps.Point(0,12),
				  // The anchor for this image is the base of the flagpole at 0,32.
				  new google.maps.Point(0, 0),
				  new google.maps.Size(12,24)
				  
			   );

		var myPositionMarker = new google.maps.Marker({
							position: startPosition,
   							 map: map,
							title:'Meine Position (auf Haus des Sports gesetzt)'+ google.maps.Marker.MAX_ZINDEX,
							icon: Image,
							zIndex: 1000002
				});

				 var options = {
		  map: map,
		  position: startPosition,
		  content: content
		};   

		var infowindow = new google.maps.InfoWindow(options);
		map.setCenter(options.position);

	  } // function handleNoGeolocation(errorFlag)
	   
  
	 
 

