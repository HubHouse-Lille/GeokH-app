// Vérifie si l'utilisateur à une connexion internet
function checkConnection() {
    if (!navigator.network)
        navigator.network = window.top.navigator.network;

    return ((navigator.network.connection.type === "none" || navigator.network.connection.type === null || navigator.network.connection.type === "unknown" ) ? false : true );
}

// Retourne un nombre aléatoire pour tirer au sort l'entrepreneur mystère
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Affiche le chronomètre au format : 08:01 au lieu de 8:1
function pad(number, length) {
    var str = '' + number;

    while (str.length < length)
        str = '0' + str;

    return str;
}

// Formate le chronomètre au mm : ss
function formatTime(time) {
    time = time / 10;

    var hours = parseInt(time / (60 * 60 * 100));
    var min = parseInt(time / (60 * 100)) - (hours * 60);
    var sec = parseInt(time / 100) - (min * 60) - (hours * 60 * 60);

    return (hours > 0 ? pad(hours, 2) : "00") + ":" + (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2);
}

// Stop le chronomètre
function stopwatch() {
    $.timer.isActive = false;
}

// Active le chronomètre
function startTimer() {
    var $stopwatch;

    // Timer speed in milliseconds
    var incrementTime = 70;

    var uptdateTimer = function updateTimer() {
        var timeString = formatTime(app.team.currentTime);
        $stopwatch.html(timeString);
        app.team.currentTime += incrementTime;
    };

    // Start the timer
    if (!this.isTimerLoaded) {
        app.team.currentTime = 0;
        this.isTimerLoaded = true;
        $stopwatch = $('#timer');
        $.timer(uptdateTimer, incrementTime, true);
    }
}

// Rotate boussole
function rotate(angle) {
    $('#compass_elt').rotate(Math.round(angle));
}

var ancienneDistance = null;
var ancienneDistanceBalise = null;

// Mise à jour de la distance
function updateDistance(distance) {
    if (ancienneDistanceBalise == null) {
        ancienneDistanceBalise = app.currentMark;
    }

    if (ancienneDistance == null || ancienneDistanceBalise != app.currentMark) {
        ancienneDistance = distance;
    }

    var compass = document.getElementById('compass');
    var conseil = compass.getElementsByClassName('conseil')[0];
    var valeur = conseil.getElementsByClassName('valeur')[0];

    var conseilHide = document.getElementById('conseilHide');

    // Affiche ou non l'indice si < 50 mètres
    if (distance < 50) {
        valeur.style['display'] = 'block';
        conseilHide.style['display'] = 'none';
    }
    else {
        valeur.style['display'] = 'none';
        conseilHide.style['display'] = 'block';
    }

    // Met à jour la distance dans l'affichage
    var dist = compass.getElementsByClassName('distance')[0];
    var valeur = dist.getElementsByClassName('valeur')[0];

    var newDistance = Math.ceil(0.5 * ancienneDistance + 0.5 * distance);
    valeur.textContent = newDistance;

    ancienneDistance = newDistance;
}

// Mise à jour de la precision
function updatePrecision(accuracy) {

    var compass = document.getElementById('compass');
    var precision = compass.getElementsByClassName('precision')[0];
    var valeur = precision.getElementsByClassName('valeur')[0];

    // Met à jour la précision dans l'affichage
    valeur.textContent = Math.ceil(accuracy);
}

// Passe une balise
function onConfirmPassMark(button) {
    // Si confirmation de passer la balise
    if (button == 1) {
        app.currentMark++;
        app.team.score -= 150;

        navigator.notification.confirm('Vous avez passé la ' + app.currentMark + '' + ((app.currentMark == 1) ? 'ere' : 'eme') + ' balise et perdu 150 points !', null, 'Balise passée', ['Ok']);

        app.showView('#compass');
    }
}

// Lorsque que l'utilisateur clique sur retour
function onBackKeyDown() {
    navigator.notification.confirm('Êtes-vous certains de vouloir quitter l\'application ?', onConfirmQuit, 'Confirmation', ['Rester', 'Quitter']);
}

// L'utilisateur quitte l'application
function onConfirmQuit(button) {
    // Si le bouton 'Quitter'
    if (button == 2)
        exitFromApp();
}

// Lors de la déconnexion on arrête les écoutes de la boussole
function exitFromApp() {
    compass.stopLocation();
    compass.stopOrientation();
    navigator.app.exitApp();
}

// Gestion slider dans une réponse
function modifierValeurSlider(valeur) {
    document.getElementById("range_valeur").textContent = valeur;
}