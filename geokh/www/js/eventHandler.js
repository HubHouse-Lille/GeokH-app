/**
 * Created by Jean-Vital on 30/10/2015.
 */

window.onload = function () {
    // ACCUEIL - Bouton "JOUER"
    $('#btn_connexion').click(function () {
        app.showView("#connexion");
    });
    // ACCUEIL - Bouton "conditions generales d'utilisation"
    $('#btn_cgu').click(function () {
        app.showView("#cgu");
    });

    // CONDITION GENERALES D'UTILISATION - Bouton "COMPRIS"
    $('#btn_connexion_cgu').click(function () {
        app.showView("#connexion");
    });

    // LANCEMENT D'UNE PARTIE - Bouton "Lancer la partie"
    $('#form_connexion').submit(function (event) {
        app.showView("#compass");
        event.preventDefault();
    });

    // RECHERCHER UNE BALISE - Bouton "Flasher le code"
    $('#btn_flash').click(function () {
        app.showView("#qr_code");
        event.preventDefault();
    });

    // QR Code Reader - Bouton CONFIRMER
    $('#btn_question').click(function () {
        app.showView("#question");
        event.preventDefault();
    });
    // QR Code Reader - Bouton "RETOUR"
    $('#btn_compass_retour').click(function () {
        app.showView("#compass");
        event.preventDefault();
    });
    // QR Code Reader - Bouton "J'AI FINI"
    $('#btn_entrepreneurs').click(function () {
        app.showView("#entrepreneurs");
    });

    // question d'une balise - Bouton "Répondre"
    $('#form_question').submit(function (event) {
        app.showView("#reponse");
        event.preventDefault();
    });

    // reponse à la question d'une balise - Bouton "CONTINUER"
    $('#btn_compass').click(function () {
        app.showView("#compass");
        event.preventDefault();
    });

    // Liste des entrepreneurs - Bouton "C'EST CET ENTREPRENEUR"
    $('#btn_entrepreneur_mystere').click(function () {
        app.showView("#entrepreneur_mystere");
    });

    // l'entrepreneur mystere - Bouton "VOIR LES SCORES"
    $('#btn_scores').click(function () {
        app.showView("#scores");
    });

    // Scores finaux - Bouton "FINIR LA PARTIE"
    $('#btn_credits').click(function () {
        app.showView("#credits");
    });

    // Credits - Bouton "QUITTER L'APPLICATION"
    $('#btn_quitter').click(function () {
        window.plugins.insomnia.allowSleepAgain();
        exitFromApp();
    });

    onLoad();
}



function show(target){
    document.getElementById(target).style.display = 'block';
    //document.getElementById("clickMeId").style.display = 'none';
}
function hide(target){
    document.getElementById(target).style.display = 'none';
    //document.getElementById("clickMeId").style.display = 'block';
}


function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Common functions
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function formatTime(time) {
    time = time / 10;

    var hours = parseInt(time / (60 * 60 * 100)),
        min = parseInt(time / (60 * 100)) - (hours * 60),
        sec = parseInt(time / 100) - (min * 60) - (hours * 60 * 60),
        hundredths = Math.ceil(pad(time - (sec * 100) - (min * 6000) - (hours * 60 * 6000), 2));
    hundredths = (hundredths < 10 || hundredths == 100 ? "00" : hundredths);
    return (hours > 0 ? pad(hours, 2) : "00") + ":" + (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2); //+ ":" + hundredths;
}

function stopwatch() {
    timer.stop().once();
}

function everthingOk() {
    console.log("Insomnia up");
}

function errorNotOk() {
    console.log("Insomnia error");
}

function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

// Cordova is loaded and it is now safe to call Cordova methods
function onDeviceReady() {
    // Register the event listener
    document.addEventListener("backbutton", onBackKeyDown, false);
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);


    $('#modal_all_indice').click(function () {

        navigator.notification.confirm(
            $("#all_founded_indice").text(),  // message
            null,                  // callback to invoke
            'Indices',            // title
            ['Merci !']            // buttonLabels
        );

    });

    // Recherche Balise > bouton passer la balise
    $('#btn_pass').click(function () {
        navigator.notification.confirm(
            "Etes-vous certain de vouloir passer cette balise ? \n Si vous passez cette balise vous perdrez 150 points !",  // message
            onConfirmPassBtn,                  // callback to invoke
            'Passer la balise',            // title
            ['Oui', 'Non']            // buttonLabels
        );
    });

    // keep awake the app
    window.plugins.insomnia.keepAwake(everthingOk, errorNotOk);

    //initialize the app
    app.initialize();

    var isInit = window.localStorage.getItem("isInit");
    if (isInit != null) {
        navigator.notification.confirm("Une sauvegarde semble exister, voulez-vous continuer ?", onConfirmStorage, "Confirmation", "Continuer,Recommencer");
    }

    //save the app avery 10 secs
    window.setInterval(function () {
        saveLocalStorage();
    }, 10000);


}


// Recherche balise > passer balise > confirmation
function onConfirmPassBtn(button) {
    if (button == 1) {
        app.balise_courante++;
        app.score -= 150;

        navigator.notification.confirm(
            "Vous avez passé la " + app.balise_courante + "" + ((app.balise_courante == 1) ? "re" : "e") + " balise et perdu 150 points !",  // message
            null,                  // callback to invoke
            'Balise passée',            // title
            ['Ok']            // buttonLabels
        );

        app.showView("#compass");
    }

}

function startTimer() {
    // Stopwatch element on the page
    var $stopwatch;

    // Timer speed in milliseconds
    var incrementTime = 70;

    // Current timer position in milliseconds
    // Output time and increment
    var uptdateTimer = function updateTimer() {
        var timeString = formatTime(app.currentTime);
        $stopwatch.html(timeString);
        app.currentTime += incrementTime;
    }

    // Start the timer
    if (!this.isTimerloaded) {
        app.currentTime = 0;
        this.isTimerloaded = true;
        $stopwatch = $('#timer');
        timer = $.timer(uptdateTimer, incrementTime, true);
    }


}

function onConfirmStorage(button) {
    if (button == 1) {
        //continuer
        loadLocalStorage();
    } else if (button == 2) {
        //reinit
        reinitLocalStorage();
    }
}

function reinitLocalStorage() {
    //delete local storage
    window.localStorage.clear();
}

function loadLocalStorage() {
    app.score = parseFloat(window.localStorage.getItem("score"));
    app.equipe = String(window.localStorage.getItem("equipe"));
    app.niveau = parseInt(window.localStorage.getItem("niveau"));
    app.parcours = parseInt(window.localStorage.getItem("parcours"));
    var tabOrdre = String(window.localStorage.getItem("parcoursOrdre"));
    app.parcoursOrdre = tabOrdre.split(",");
    app.balises = jQuery.parseJSON(window.localStorage.getItem("balises"));
    app.questions = jQuery.parseJSON(window.localStorage.getItem("questions"));
    app.entrepreneurs = jQuery.parseJSON(window.localStorage.getItem("entrepreneurs"));
    app.balise_courante = parseInt(window.localStorage.getItem("balise_courante"));
    app.question_courante = parseInt(window.localStorage.getItem("question_courante"));
    app.entrepreneur_select = String(window.localStorage.getItem("entrepreneur_select"));
    app.entrepreneur_aTrouver = String(window.localStorage.getItem("entrepreneur_aTrouver"));
    app.nb_balises_trouvees = parseInt(window.localStorage.getItem("nb_balises_trouvees"));
    app.nb_reponses_trouvees = parseInt(window.localStorage.getItem("nb_reponses_trouvees"));
    app.isTimerloaded = Boolean(window.localStorage.getItem("isTimerloaded"));
    //reinit -> always launch
    app.isTimerloaded = false;
    startTimer();

    var tab = String(window.localStorage.getItem("bonnesReponsesUser"));
    app.bonnesReponsesUser = (!tab.trim()) ? [] : tab.split(",");
    app.currentTime = parseInt(window.localStorage.getItem("currentTime"));
    //app.debugOnBrowser = window.localStorage.getItem("debugOnBrowser");
    var d = new Date();
    var now = d.getTime();
    var local = parseInt(window.localStorage.getItem("localTime"));
    var diff = Math.ceil(Math.abs(now - local));

    app.currentTime = parseInt(diff) + app.currentTime;
    app.currentTime = parseInt(app.currentTime);

    app.nb_points_correct = parseInt(window.localStorage.getItem("nb_points_correct"));
    var backupView = app.actualView;
    app.actualView = String(window.localStorage.getItem("actualView"));
    if (app.actualView != backupView) {
        app.showView(app.actualView);
    }


}

function saveLocalStorage() {

    window.localStorage.setItem("score", String(app.score));
    window.localStorage.setItem("equipe", String(app.equipe));
    window.localStorage.setItem("niveau", String(app.niveau));
    window.localStorage.setItem("parcours", String(app.parcours));
    window.localStorage.setItem("parcoursOrdre", String(app.parcoursOrdre));
    window.localStorage.setItem("balises", JSON.stringify(app.balises));
    window.localStorage.setItem("questions", JSON.stringify(app.questions));
    window.localStorage.setItem("entrepreneurs", JSON.stringify(app.entrepreneurs));
    window.localStorage.setItem("balise_courante", String(app.balise_courante));
    window.localStorage.setItem("question_courante", String(app.question_courante));
    window.localStorage.setItem("entrepreneur_select", String(app.entrepreneur_select));
    window.localStorage.setItem("entrepreneur_aTrouver", String(app.entrepreneur_aTrouver));
    window.localStorage.setItem("nb_balises_trouvees", String(app.nb_balises_trouvees));
    window.localStorage.setItem("nb_reponses_trouvees", String(app.nb_reponses_trouvees));
    window.localStorage.setItem("isTimerloaded", String(app.isTimerloaded));
    window.localStorage.setItem("bonnesReponsesUser", String(app.bonnesReponsesUser));
    window.localStorage.setItem("currentTime", String(app.currentTime));
    var d = new Date();
    var n = d.getTime();
    window.localStorage.setItem("localTime", String(n));
    //window.localStorage.setItem("debugOnBrowser",app.debugOnBrowser);
    window.localStorage.setItem("nb_points_correct", String(app.nb_points_correct));
    window.localStorage.setItem("actualView", String(app.actualView));
    window.localStorage.setItem("isInit", "true");
}

function onPause() {
    saveLocalStorage();
}

function onResume() {
    loadLocalStorage();
}

function exitFromApp() {
    //reinitLocalStorage();
    saveLocalStorage();
    compass.stopLocation();
    compass.stopOrientation();
    navigator.app.exitApp();
}

function onBackKeyDown(e) {
    navigator.notification.confirm("Êtes-vous certains de vouloir quitter l'application ?", onConfirm, "Confirmation", "Rester,Sauver et Quitter");
}

function onConfirm(button) {
    if (button == 2) {
        exitFromApp();
    }
}
