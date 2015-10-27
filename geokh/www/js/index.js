/**
 *
 * Auteurs : Goblot Pauline et Bauduin Raphael
 *
 */
var app = {
    //Application variables
    //score tout au long du jeu
    score: 0,
    //nom de l'equipe
    equipe: "",
    //niveau choisit
    niveau: 1,
    //parcours choisit
    parcours: 1,
    //l'ordre des balises du parcours
    parcoursOrdre: [],
    //les balises a chercher
    balises: {},
    //les questions a poser
    questions: {},
    //les entrepreneurs
    entrepreneurs: {},
    //prochaine balise cherchée
    balise_courante: 0,
    //prochaine balise question posée
    question_courante: "",
    //
    entrepreneur_select: "",
    entrepreneur_aTrouver: "entrepreneur_",
    nb_balises_trouvees: 0,
    nb_reponses_trouvees: 0,
    isTimerloaded: false,
    bonnesReponsesUser: [],
    currentTime: 0,
    debugOnBrowser: false,
    nb_points_correct: 500,
    actualView: "",
    distanceMinToShowIndice: 50,


    // Application Constructor
    initialize: function initialize() {
        //chargement des balises
        this.balises = balises.balises;
        //chargement des questions
        this.questions = questions.questions;
        //chargement des entrepreneurs
        this.entrepreneurs = entrepreneurs.entrepreneurs;

        //permet de définir un entrepeneur a trouver de maniere aleatoire parmis tous disponibles
        var nombreEntrepreneurs = Object.keys(this.entrepreneurs).length;
        this.entrepreneur_aTrouver += randomIntFromInterval(1, nombreEntrepreneurs);

        //cacher tous les indices
        $(".indice").hide();

        //affichage de la première vue
        this.showView("#accueil");


        this.showView("#compass");



    },
    /*
     * Gere l'affichage de la vue demandée.
     */
    showView: function showView(view_id) {

        // On redessine
        $('html').css("background","url(img/view_bg.png) top right no-repeat fixed");
        $('html').css("background-size","90% auto");
        $('header').css("visibility","visible");

        $(".view").hide();
        $(view_id).show();
        this.actualView = view_id;
        switch (view_id) {
            case "#connexion":
                this.showConnexionView();
                break;
            case "#compass":
                this.showBaliseView();
                break;
            case "#qr_code":
                this.showQrCodeView();
                break;
            case "#question":
                this.showQuestionBaliseView();
                break;
            case "#reponse":
                this.showReponseBaliseView();
                break;
            case "#entrepreneurs":
                this.showQuestionBaliseView();
                break;
            case "#entrepreneur_mystere":
                this.showEntrepreneurMystereView();
                break;
            case "#scores":
                this.showScoreView();
                break;
            case "#credits":
                this.showCreditsView();
                break;
            case "#accueil":
                this.showAccueil();
                break;
            case "#cgu":
                this.showCgu();
                break;
            default :
                break;
        }
    },


    /*
     * Affiche correctement la page d'accueil
     */
    showAccueil: function showAccueil() {
        // On redessine
        $('html').css("background","url(img/accueil_bg.jpg) no-repeat 0 100% fixed");
        $('header').css("visibility","hidden");
    },

    /*
     * Affiche correctement la page de conditions d'utilisation
     */
    showCgu: function showCgu() {

    },

    /*
     * charge les informations pour la vue de recherche de balise
     */
    showBaliseView: function showBaliseView() {

        //cacher les conseils pour les balises par défaut
        $('#conseilHide').show();
        $('#compass .conseil .valeur').hide();

        $("#numero_balise").html(this.balise_courante + 1);

        if (this.balise_courante == (Object.keys(this.balises).length) - 1) {
            $("#btn_pass").attr("disabled", "disabled");
        }

        this.isTimerloaded = true;
        if (app.debugOnBrowser == false) {
            compass.stopLocation();
            compass.stopOrientation();
            //lancement de la recherche de position et de l'orientation
            compass.activateLocation();
            compass.activateOrientation();
        }
        //affichage du score actuel
        $('#compass .score .valeur span').text(this.score);

        //affichage du conseil pour trouver la balise
        $('#compass .conseil .valeur').text(this.balises["balise_" + this.parcoursOrdre[this.balise_courante]].indice);

        //définition du point gps de la balise
        //la distance et la précision sont mises à jour par les fonctions updateDistance() et updatePrecision()
        compass.data.destination = new LatLon(this.balises["balise_" + this.parcoursOrdre[this.balise_courante]].latitude, this.balises["balise_" + this.parcoursOrdre[this.balise_courante]].longitude);


        startTimer();


    },

    /*
     * Verifie les infos de formulaires de connexion
     */
    showConnexionView: function showConnexionView() {

        $('header').show();

         this.parcoursOrdre = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        $("input[name=form_parcours]").change(function (event) {
            app.parcours = $('input[name=form_parcours]:checked').val();
            if (app.parcours == "1") {
                app.parcoursOrdre = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
            } else if (app.parcours == "2") {
                app.parcoursOrdre = [10, 1, 2, 9, 8, 5, 6, 4, 3, 7, 11];
            } else {
                app.parcoursOrdre = [2, 7, 5, 6, 4, 3, 8, 9, 10, 1, 11];
            }
        });


    },
    /*
     * Charge les informations pour la vue de question
     */
    showQrCodeView: function showQrCodeView() {
        $('#btn_question').hide();
        $("#btn_entrepreneurs").hide();
        $('#btn_compass_retour').show();
        $("#qr_code_result").html("Flash du QR Code");
        var parcoursText = this.parcours > 9 ? "" : "0";
        var baliseText = this.parcoursOrdre[this.balise_courante] > 9 ? "" : "0";
        var textATrouver = "balise_" + baliseText + this.parcoursOrdre[this.balise_courante] + "_parcours_" + parcoursText + 1;
        if (app.debugOnBrowser == false) {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    if (result.text == "") {
                        $("#qr_code_result").html("Aucun code flashé");
                    } else if (result.text == textATrouver) {
                        $("#qr_code_result").html("Bonne balise ! Félicitations !");
                        $('#btn_question').show();
                        $('#btn_compass_retour').hide();
                        if (app.balise_courante == (Object.keys(app.balises).length) - 1) {
                            $("#btn_entrepreneurs").show();
                            $('#btn_question').hide();
                        }
                    } else {
                        $("#qr_code_result").html("Mauvaise balise !");
                    }

                },
                function (error) {
                    $("#qr_code_result").html("Scanning failed: " + error);
                }
            );
        }

    },

    /*
     * Charge les informations pour la vue de question 
     */
    showQuestionBaliseView: function showQuestionBaliseView() {

        if (app.debugOnBrowser == false) {
            compass.stopLocation();
            compass.stopOrientation();
        }
        this.nb_balises_trouvees++;

        //si on est à la dernière balise, l'affichage de la question est différent
        if (this.balise_courante == (Object.keys(this.balises).length) - 1) {

            //récupération des informations sur la question à afficher 
            this.question_courante = this.balises["balise_" + this.parcoursOrdre[this.balise_courante]].question;

            //affichage de la question
            $('#entrepreneurs .lib_question').text(this.questions[this.question_courante].question);

            //recupération des informations des entrepreneurs
            var entrepreneurs_liste = [];
            for (var i = 0; i < this.questions[this.question_courante].propositions.length; i++) {
                entrepreneurs_liste.push(this.entrepreneurs[this.questions[this.question_courante].propositions[i]]);
            }
            ;

            var html_miniatures = "";
            var html_entrepreneur = "";

            for (var i = 0; i < entrepreneurs_liste.length; i++) {
                html_miniatures += '<a href="#" onclick="app.showEnt(\'' + this.questions[this.question_courante].propositions[i] + '\'); return false;">'
                + '<img src="img/user.svg" alt="' + entrepreneurs_liste[i].prenom + ' ' + entrepreneurs_liste[i].nom + '" class="ent_min" />'
                + '</a>';
                html_entrepreneur += '<div id="' + this.questions[this.question_courante].propositions[i] + '" style="display: none;">'
                + '<p class="ent_nom">' + entrepreneurs_liste[i].prenom + ' ' + entrepreneurs_liste[i].nom + '</p>'
                + '<div class="ent_desc">';
                for (var j = 0; j < entrepreneurs_liste[i].interview.length; j++) {
                    html_entrepreneur += '<p class="ent_question">' + entrepreneurs_liste[i].interview[j].question + '</p>';
                    for (var k = 0; k < entrepreneurs_liste[i].interview[j].reponses.length; k++) {
                        html_entrepreneur += '<p class="ent_reponse">' + entrepreneurs_liste[i].interview[j].reponses[k] + '</p>';
                    }
                }
                html_entrepreneur += '</div></div>';
            }
            ;
            $('#entrepreneurs .ents_miniatures').html(html_miniatures);
            $('#entrepreneurs #ents_presentation').html(html_entrepreneur);

            $('#modal_all_indice').prop('disabled', false);
            var indices = "";

            for (var i = 0; i < this.bonnesReponsesUser.length; i++) {
                var indiceBonneRep = this.bonnesReponsesUser[i];
                indices += (i + 1) + " -> " + indiceBonneRep + "\n";
            }
            $('#all_founded_indice').text(indices);


            //on montre la premiere page pour commencer, hardcode ok
            this.showEnt("entrepreneur_1");

        } else {
            //mise à jour du score actuel
            $('#question .score .valeur span').text(this.score);

            //récupération des informations sur la question à afficher 
            this.question_courante = this.balises["balise_" + this.parcoursOrdre[this.balise_courante]].question;

            //affichage de la difficutlé
            $('#question .difficulte .valeur span').text(this.questions[this.question_courante].difficulte);
            //affichage de la question
            $('#question .lib_question .valeur span').text(this.questions[this.question_courante].question);

            //ajout des réponses
            $('#form_question .reponses').html('');
            //si la question est un QCM, les réponses auront un checkbox
            if (this.questions[this.question_courante].type == "QCM") {
                for (var i = 0; i < this.questions[this.question_courante].propositions.length; i++) {
                    $('#form_question .reponses').append('<div class="form_groupe"><input type="checkbox" name="form_reponse[]" id="form_reponse' + (i + 1) + '" value="' + (i + 1) + '" /><label for="form_reponse' + (i + 1) + '">' + this.questions[this.question_courante].propositions[i] + '</label></div>');
                }
                //si la question est un QCU, les réponses auront un bouton radio
            } else if (this.questions[this.question_courante].type == "QCU") {
                for (var i = 0; i < this.questions[this.question_courante].propositions.length; i++) {
                    $('#form_question .reponses').append('<div class="form_groupe"><input type="radio" name="form_reponse" id="form_reponse' + (i + 1) + '" value="' + (i + 1) + '" /><label for="form_reponse' + (i + 1) + '">' + this.questions[this.question_courante].propositions[i] + '</label></div>');
                }
            }
        }
    },
    /*
     * charge les informations pour la vue des réponses à une question
     */
    showReponseBaliseView: function showReponseBaliseView() {

        //recuperation de(s) reponse(s) choisie(s) par l'utilisateur 
        var input_reponses_courante = $('#form_question .reponses input:checked');

        //recuperation de(s) bonne(s) reponse(s)
        var reponses_courantes = [];
        for (var i = 0; i < input_reponses_courante.length; i++) {
            reponses_courantes.push($(input_reponses_courante[i]).val() * 1);
        }
        var nb_reponses = this.questions[this.question_courante].reponses.length;

        //test si l'utilisateur a donne la(les) bonne(s) reponse(s).
        //s'il n'y a pas le même nombre de réponses entre l'utilisateur et celles du fichier alors l'utilisateur n'a pas la bonne réponse.
        var is_correct = false;
        var is_all_correct = true;
        var nbOfCorrectAnswers = 0;
        var i = 0;

        while (i < reponses_courantes.length) {
            is_correct = $.inArray(reponses_courantes[i], this.questions[this.question_courante].reponses) > -1 ? true : false;
            if (is_correct) nbOfCorrectAnswers++;
            if (is_correct == false) is_all_correct = false;
            i++;
        }

        var scoreToAdd = 0;
        //si tout les reponses fournies sont bonnes
        if (is_all_correct && reponses_courantes.length > 0) {


            //si on a tout donné de correct
            //on peut simplifé en gardant la seconde expression, mais pour des soucis de clarté on préfere gardé si par la suite
            //il y a d'autre changements concernant les points
            if (nb_reponses == nbOfCorrectAnswers) {
                //on ajoute les points que l'utilisateur a parié
                //multiplié par le niveau de la question
                $("#reponse .correct").show();
                $("#reponse .partial").hide();
                scoreToAdd = $('#form_pari').val() * this.questions[this.question_courante].difficulte;
            } else {
                //on ajoute les points que l'utilisateur a parié
                //multiplié par le niveau de la question
                //multiplié par un ratio de bonne réponses
                $("#reponse .partial").show();
                $("#reponse .correct").show();
                scoreToAdd = $('#form_pari').val() * this.questions[this.question_courante].difficulte * (nbOfCorrectAnswers / nb_reponses);
            }

            scoreToAdd = Math.round(scoreToAdd);
            this.score += scoreToAdd;


            $("#reponse .errone").hide();

            $('#reponse .score .bonus span').text(scoreToAdd);

            //on laisse le bouton ouvert
            $('#modal_reponse').prop('disabled', false);

            //on augmente le nombre de bonnes réponses pour les statistiques finales
            this.nb_reponses_trouvees++;

            //la bonne reponse de l'utilisateur, utilisé pour garder les questions pour lesquelles ont peut afficher tous les indices a la fin !


            var indice = this.entrepreneurs[this.entrepreneur_aTrouver].indices["indice_" + this.parcoursOrdre[this.balise_courante]];
            $('#reponse_indice').text(indice);
            this.bonnesReponsesUser.push(indice);
            //notif indice bonne réponse
            navigator.notification.confirm(
                $("#reponse_indice").text(),  // message
                null,                  // callback to invoke
                'Indice',            // title
                ['Merci !']            // buttonLabels
            );


        } else {
            //retrait des points pariés
            this.score -= $('#form_pari').val() * this.questions[this.question_courante].difficulte;

            //disable le bouton d'indice
            $('#modal_reponse').prop('disabled', true);
            $("#reponse .errone").show();
            $("#reponse .correct").hide();
            $("#reponse .partial").hide();
            $('#reponse .score .bonus span').text(scoreToAdd);
        }

        //mise a jour du score actuel
        $('#reponse .score .valeur span').text(this.score);

        //récupération des retours sur les réponses
        var retours = this.questions[this.question_courante].retour;

        //affichage des retours
        $('#reponse .retour .valeur').html("");
        for (var i = 0; i < retours.length; i++) {
            //si l'élément est de type string c'est un paragraphe
            if (typeof retours[i] == "string") {
                $('#reponse .retour .valeur').append(retours[i]);
                //sinon l'élément est une liste
            } else {
                var liste = "<ul>";
                for (var j = 0; j < retours[i].length; j++) {
                    liste += "<li>" + retours[i][j] + "</li>";
                }
                liste += "</ul>";
                $('#reponse .retour .valeur').append(liste);
            }
        }


        this.balise_courante++;
    },
    /*
     * Charge les informations pour la vue de l'entrepreneur mystere
     */
    showEntrepreneurMystereView: function showEntrepreneurMystereView() {

        //si l'utilisateur a choisi le bon entrepreneur
        if (this.entrepreneur_select == this.entrepreneur_aTrouver) {
            $("#entrepreneur_mystere .correction .correct").show();
            $("#entrepreneur_mystere .correction .errone").hide();
            $("#entrepreneur_mystere .score .bonus span").html(app.nb_points_correct);
            $("#entrepreneur_mystere .score .bonus").show();
            this.score += app.nb_points_correct;
        } else {
            $("#entrepreneur_mystere .correction .errone").show();
            $("#entrepreneur_mystere .correction .correct").hide();
            $("#entrepreneur_mystere .score .bonus").hide();
        }
        ;
        $("#entrepreneur_mystere .ent_presentation .ent_nom").html(this.entrepreneurs[this.entrepreneur_aTrouver].nom);
        $("#entrepreneur_mystere .ent_presentation .ent_prenom").html(this.entrepreneurs[this.entrepreneur_aTrouver].prenom);

        $("#entrepreneur_mystere .score .valeur").html(this.score);
    },
    /*
     * Charge les informations pour la vue de récapitulatif des scores
     */
    showScoreView: function showScoreView() {
        $("#scores .niveau .valeur").html(this.niveau);
        $("#scores .balises .valeur").html(this.nb_balises_trouvees);
        $("#scores .balises .maximum").html(Object.keys(this.balises).length - 1);

        $("#scores .reponses .valeur").html(this.nb_reponses_trouvees);
        $("#scores .reponses .maximum").html(Object.keys(this.balises).length - 1);

        $("#scores .paris .valeur").html();

        $("#scores .points .valeur").html(this.score);

        stopwatch();
        var timeString = formatTime(app.currentTime);
        $("#timer_final").html(timeString);

    },
    /*
     * Anime l'image de compass pour qu'il indique tous le temps la bonne direction
     */
    rotate: function rotate(_angle) {
        $('#compass_elt').rotate(_angle);
    },
    /*
     * change l'entrepreuneur visible
     */
    showEnt: function showEnt(ent) {
        if (this.entrepreneur_select != "") {
            $("#entrepreneurs #ents_presentation #" + this.entrepreneur_select).hide();
        }
        $("#entrepreneurs #ents_presentation #" + ent).show();
        this.entrepreneur_select = ent;
    },
    updateDistance: function updateDistance(distance) {

        if (distance < app.distanceMinToShowIndice) {
            $('#compass .conseil .valeur').show();
            $('#conseilHide').hide();
        } else {
            $('#conseilHide').show();
            $('#compass .conseil .valeur').hide();
        }
        $('#compass .distance .valeur span').text(distance);
    },
    updatePrecision: function updatePrecision(precision) {
        $('#compass .precision .valeur span').text(precision);
    }
};


window.onload = function () {
    $('#btn_connexion').click(function () {
        app.showView("#connexion");
    });
    $('#btn_connexion_cgu').click(function () {
        app.showView("#connexion");
    });

    $('#btn_cgu').click(function () {
        app.showView("#cgu");
    });

    $('#form_connexion').submit(function (event) {
        app.showView("#compass");
        event.preventDefault();
    });

    $('#btn_flash').click(function () {
        app.showView("#qr_code");
        event.preventDefault();
    });

    $('#btn_question').click(function () {
        app.showView("#question");
        event.preventDefault();
    });

    $('#form_question').submit(function (event) {
        app.showView("#reponse");

        event.preventDefault();
    });

    $('#btn_compass_retour').click(function () {
        app.showView("#compass");
        event.preventDefault();
    });

    $('#btn_compass').click(function () {
        app.showView("#compass");
        event.preventDefault();
    });

    $('#btn_entrepreneurs').click(function () {
        app.showView("#entrepreneurs");
    });

    $('#btn_entrepreneur_mystere').click(function () {
        app.showView("#entrepreneur_mystere");
    });

    $('#btn_scores').click(function () {
        app.showView("#scores");
    });

    $('#btn_credits').click(function () {
        app.showView("#credits");
    });

    $('#btn_quitter').click(function () {
        window.plugins.insomnia.allowSleepAgain();
        exitFromApp();
    });

    onLoad();

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


    $('#btn_pass').click(function () {

        navigator.notification.confirm(
            "Etes-vous certain de vouloir passer cette balise ? \n Vous allez perdre 150 points !",  // message
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

app.initialize();