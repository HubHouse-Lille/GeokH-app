var inria = new LatLon(50.604855, 3.149164);
var secretariat = new LatLon(50.605638, 3.148236);
var m5 = new LatLon(50.609593, 3.136724);


var compass = {};
compass.data = {};
compass.data.position = {};
compass.data.actualPosition = {};
compass.data.heading = {};

var compassLocActi = false;
var compassOriActi = false;

compass.data.destination = {};
var idWatchLoc = 0;
var idWatchOrient = 0;

var countErrorsLoc = 0;
var countErrorsOr = 0;

var updateTimer = 750;

compass.onSuccessLocation = function onSuccessLocation(_position) {
    compass.data.position = _position;

    app.updatePrecision(Math.round(compass.data.position.coords.accuracy));

    actualPosition = new LatLon(compass.data.position.coords.latitude, compass.data.position.coords.longitude);
    app.updateDistance(Math.round(actualPosition.distanceTo(compass.data.destination) * 1000));
}

compass.onErrorLocation = function onErrorLocation(error) {
    countErrorsLoc++;
    if (countErrorsLoc == 3) {
        navigator.notification.alert('Localisation non disponible', function () {
        }, 'Erreur', 'Ok');
    }
}

compass.onSuccessOrientation = function onSuccessOrientation(_heading) {
    compass.data.heading = _heading;
    var angle = actualPosition.bearingTo(compass.data.destination) - compass.data.heading.magneticHeading
    app.rotate(Math.round(angle));
};

compass.onErrorOrientation = function onErrorOrientation(error) {
    countErrorsOr++;
    if (countErrorsOr == 3) {
        navigator.notification.alert('Orientation non disponible', function () {
        }, 'Erreur', 'Ok');

    }
};

// LOCATION
compass.stopLocation = function stopLocation() {
    navigator.geolocation.clearWatch(idWatchLoc);
    countErrorsLoc = 0;
    compassLocActi = false;
};

compass.activateLocation = function activateLocation() {
    if (navigator.geolocation) {
        var options = {maximumAge: 0, timeout: updateTimer, enableHighAccuracy: true};
        idWatchLoc = navigator.geolocation.watchPosition(compass.onSuccessLocation,
            compass.onErrorLocation,
            options);
        compassLocActi = true;
    } else {
        navigator.notification.alert('Localisation non disponible', function () {
        }, 'Erreur', 'Ok');
    }
};

// ORIENTATION
compass.stopOrientation = function stopOrientation() {
    navigator.compass.clearWatch(idWatchOrient);
    countErrorsOr = 0;
    compassOriActi = false
};

compass.activateOrientation = function activateOrientation() {
    if (navigator.compass) {
        var options = {
            frequency: updateTimer
        }; // Update every .5 seconds
        idWatchOrient = navigator.compass.watchHeading(compass.onSuccessOrientation,
            compass.onErrorOrientation, options);
        compassOriActi = true;
    } // TODO : remettre les notifications pour l'app
    /* else {
        navigator.notification.alert('Orientation non disponible', function () {
        }, 'Erreur', 'Ok');
    } */
};