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
    nbbalises: 0,
    //les questions a poser
    questions: {},
    //les entrepreneurs
    entrepreneurs: {},
    // les parcours
    nbparcours: 0,
    parcours: {},
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


    // var scope question
    nbptsparie: -1,






    // Application Constructor
    initialize: function initialize() {
        //chargement des balises
        this.balises = balises.balises;
        this.nbbalises = this.balises.length;
        //chargement des questions
        this.questions = questions.questions;
        // chargement des parcours
        this.parcours = parcours.parcours;
        this.nbparcours = this.parcours.length;
        //chargement des entrepreneurs
        this.entrepreneurs = entrepreneurs.entrepreneurs;

        //permet de définir un entrepeneur a trouver de maniere aleatoire parmis tous disponibles
        var nombreEntrepreneurs = Object.keys(this.entrepreneurs).length;
        this.entrepreneur_aTrouver += randomIntFromInterval(1, nombreEntrepreneurs);


        //cacher tous les indices
        $(".indice").hide();

        //affichage de la première vue

        this.parcoursOrdre = [1, 10, 11];
        //this.parcoursOrdre = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        this.showView("#accueil");

        //this.showView("#entrepreneurs");
        //$("#qr_code").show();
    },


    /*
     * Gere l'affichage de la vue demandée.
     */
    showView: function showView(view_id) {

        if (app.actualView != view_id) {

            // On redessine
            $('html').css("background","url(img/view_bg.png) top right no-repeat fixed");
            $('html').css("background-size","90% auto");
            $('header').css("visibility","visible");

            $(".view").hide();
            $(view_id).show();
        }

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
            case "#entrepreneurs":
                this.showQuestionEntrepreneurView();
                break;
            case "#reponse":
                this.showReponseBaliseView();
                break;
            /*case "#entrepreneurs":
                this.showQuestionBaliseView();
                break;*/
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




    // ACCUEIL
    showAccueil: function showAccueil() {
        // On redessine
        $('html').css("background","url(img/accueil_bg.jpg) no-repeat 0 100% fixed");
        $('header').css("visibility","hidden");
    },
    // CGU
    showCgu: function showCgu() {

    },
    // APRES FORMULAIRE CONNEXION
    showConnexionView: function showConnexionView() {
        $('header').show();
        // TODO décommenter la gestion des parcours d'ordre
        /*this.parcoursOrdre = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        $("input[name=form_parcours]").change(function (event) {
            app.parcours = $('input[name=form_parcours]:checked').val();
            if (app.parcours == "1") {
                app.parcoursOrdre = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
            } else if (app.parcours == "2") {
                app.parcoursOrdre = [10, 1, 2, 9, 8, 5, 6, 4, 3, 7, 11];
            } else {
                app.parcoursOrdre = [2, 7, 5, 6, 4, 3, 8, 9, 10, 1, 11];
            }
        });*/
    },



    // RECHECHE
    showBaliseView: function showBaliseView() {

        // cacher les CONSEIL pour les balises par défaut
        $('#compass .conseil .valeur').hide();
        $('#compass .conseil .valeur span').text(this.balises["balise_" + this.parcoursOrdre[this.balise_courante]].indice);

        // affiche le num BALISE COURANTE dans la headerBar
        $('#compass .sectionBar span').html((this.balise_courante + 1) + " / " + (this.nbbalises));

        // affichage du SCORE actuel
        $('#compass .score .valeur span').text(this.score);

        if (this.balise_courante == (Object.keys(this.balises).length) - 1) {
            $("#btn_pass").attr("disabled", "disabled");
        }

        // définition du point gps de la balise
        // la distance et la précision sont mises à jour par les fonctions updateDistance() et updatePrecision()
        compass.data.destination = new LatLon(this.balises["balise_" + this.parcoursOrdre[this.balise_courante]].latitude, this.balises["balise_" + this.parcoursOrdre[this.balise_courante]].longitude);

        // On initialise le timer
        this.isTimerloaded = true;
        if (app.debugOnBrowser == false) {

            if (compassLocActi) { compass.stopLocation(); }
            if (compassOriActi) { compass.stopOrientation(); }

            //lancement de la recherche de position et de l'orientation
            if (!compassLocActi) { compass.activateLocation(); }
            if (!compassOriActi) { compass.activateOrientation(); }

        }

        startTimer();
    },
    // VALIDATION QR CODE
    showQrCodeView: function showQrCodeView() {

        if (this.debugOnBrowser) {
            app.showView("#question");
        }

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
                        $("#qr_code_result").html("Mauvaise balise ! : " + textATrouver + " - " + result.text);
                    }
                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );
        }

    },



    // QUESTION
    showQuestionBaliseView: function showQuestionBaliseView() {

        if (app.debugOnBrowser == false) {
            compass.stopLocation();
            compass.stopOrientation();
        }
        this.nb_balises_trouvees++;

        /*
         * Si on est à la dernière balise, l'affichage de la question est différent
         */
        var maxquestions = (Object.keys(this.balises).length) - 1;
        if (this.balise_courante >= maxquestions) {

            app.showView("#questionEnt");

            /*
            // récupération des informations sur la question à afficher
            this.question_courante = this.balises["balise_" + this.parcoursOrdre[this.balise_courante]].question;

            // affichage de la question
            $('#entrepreneurs .lib_question').text(this.questions[this.question_courante].question);

            // recupération des informations des entrepreneurs
            var entrepreneurs_liste = [];
            for (var i = 0; i < this.questions[this.question_courante].propositions.length; i++) {
                entrepreneurs_liste.push(this.entrepreneurs[this.questions[this.question_courante].propositions[i]]);
            }

            app.questions;
            app.balise_courante;

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


            // on montre la premiere page pour commencer, hardcode ok
            this.showEnt("entrepreneur_1");
            */
        }
        else
        {
            // mise à jour du score actuel
            $('#question .score .valeur span').text(this.score);

            // récupération des informations sur la question à afficher
            this.question_courante = this.balises["balise_" + this.parcoursOrdre[this.balise_courante]].question;

            // affichage de la difficutlé
            //$('#question .difficulte .valeur span').text(this.questions[this.question_courante].difficulte);
            $('#question .difficulte .valeur span').text("5");

            // affichage de la question
            $('#question .ref_qbeq .valeur span').text(this.questions[this.question_courante].question);

            // ajout des réponses
            $('#form_question .reponses').html('');

            // si la question est un QCM, les réponses auront un checkbox
            if (this.questions[this.question_courante].type == "QCM") {
                for (var i = 0; i < this.questions[this.question_courante].propositions.length; i++) {
                    $('#form_question .reponses').append('' +
                        '<tr><td class="cb-col"><input type="checkbox" name="thing" value="'+(i+1)+'" id="form_reponse'+(i+1)+'"/><label for="form_reponse'+(i+1)+'"></label></td><td><p class="questiontxt">'
                        + this.questions[this.question_courante].propositions[i]
                        + '</p></td></tr>'
                        // +'<div class="form_groupe"><input type="checkbox" name="form_reponse[]" id="form_reponse' + (i + 1) + '" value="' + (i + 1) + '" /><label for="form_reponse' + (i + 1) + '">' + this.questions[this.question_courante].propositions[i] + '</label></div>'
                        );
                }
                //si la question est un QCU, les réponses auront un bouton radio
            } else if (this.questions[this.question_courante].type == "QCU") {
                for (var i = 0; i < this.questions[this.question_courante].propositions.length; i++) {
                    $('#form_question .reponses').append('' +
                        '<tr><td class="cb-col"><input type="radio" name="thing" value="valuable" id="form_reponse'+(i+1)+'"/><label for="form_reponse'+(i+1)+'"></label></td><td><p class="questiontxt">'
                        + this.questions[this.question_courante].propositions[i]
                        + '</p></td></tr>'
                        // $('#form_question .reponses').append('<div class="form_groupe"><input type="radio" name="form_reponse" id="form_reponse' + (i + 1) + '" value="' + (i + 1) + '" /><label for="form_reponse' + (i + 1) + '">' + this.questions[this.question_courante].propositions[i] + '</label></div>');
                    );
                }
            }
        }
    },
    // REPONSES
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



        /*
         * si tout les reponses fournies sont bonnes
         */
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
            if (!this.debugOnBrowser) {
                navigator.notification.confirm(
                    $("#reponse_indice").text(),  // message
                    null,                  // callback to invoke
                    'Indice',            // title
                    ['Merci !']            // buttonLabels
                );
            }


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
    // QUESTION ENTREPRENEUR MYSTERE
    showQuestionEntrepreneurView: function showQuestionEntrepreneurView() {

        /*
         * Affiche la dernière question, celle concernant l'entrepreneur mystere
         */
        // récupération des informations sur la question à afficher
        this.question_courante = "question_11"//this.balises["balise_" + this.parcoursOrdre[this.balise_courante]].question;

        // affichage de la question
        $('#entrepreneurs .lib_question').text(this.questions[this.question_courante].question);

        // recupération des informations des entrepreneurs
        var entrepreneurs_liste = [];
        for (var i = 0; i < this.questions[this.question_courante].propositions.length; i++) {
            entrepreneurs_liste.push(this.entrepreneurs[this.questions[this.question_courante].propositions[i]]);
        }

        app.questions;
        app.balise_courante;

        var html_miniatures = "";
        var html_entrepreneur = "";

        for (var i = 0; i < entrepreneurs_liste.length; i++) {
            html_miniatures += ''
                + '<a href="#" onclick="app.showEnt(\'' + this.questions[this.question_courante].propositions[i] + '\'); return false;">'
                + '<img src="img/ent'+(i+1)+'.png" alt="' + entrepreneurs_liste[i].prenom + ' ' + entrepreneurs_liste[i].nom + '" class="ent_min" />'
                + '</a>';
            html_entrepreneur += '<br>'
                + '<div id="' + this.questions[this.question_courante].propositions[i] + '" style="display: none;">'
                + '<H2 class="ent_nom">' + entrepreneurs_liste[i].prenom + ' ' + entrepreneurs_liste[i].nom + '</h2>'
                + '<div class="ent_desc">';
            for (var j = 0; j < entrepreneurs_liste[i].interview.length; j++) {
                html_entrepreneur += '<h2 class="ent_question">' + entrepreneurs_liste[i].interview[j].question + '</h2>';
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


        // on montre la premiere page pour commencer, hardcode ok
        this.showEnt("entrepreneur_1");

    },
    // REPONSE ENTREPRENEUR MYSTERE
    showEntrepreneurMystereView: function showEntrepreneurMystereView() {

        // SI BON ENTREPRENEUR
        if (this.entrepreneur_select == this.entrepreneur_aTrouver) {
            $("#entrepreneur_mystere .correction .correct").show();
            $("#entrepreneur_mystere .correction .errone").hide();
            $("#entrepreneur_mystere .score .bonus .bonus").html(app.nb_points_correct);
            $("#entrepreneur_mystere .score .bonus").show();
            this.score += app.nb_points_correct;
        }
        // SI MAUVAIS ENTREPRENEUR
        else {
            $("#entrepreneur_mystere .correction .errone").show();
            $("#entrepreneur_mystere .correction .correct").hide();
            $("#entrepreneur_mystere .score .bonus").hide();
        }


        $("#entrepreneur_mystere .ents_miniature .ent_presentation_img").attr("src", "img/"+(this.entrepreneurs[this.entrepreneur_aTrouver].photo));
        $("#entrepreneur_mystere .ent_presentation_nom .embs").html(this.entrepreneurs[this.entrepreneur_aTrouver].prenom + " " + this.entrepreneurs[this.entrepreneur_aTrouver].nom);

        $("#entrepreneur_mystere .score .valeur span").html(this.score);
    },


    // SCORE RECAP
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
     * SPECIAL
     */
    // COMPASS
    rotate: function rotate(_angle) {
        $('#compass_elt').rotate(_angle);
    },

    // change l'entrepreuneur visible
    showEnt: function showEnt(ent) {
        if (this.entrepreneur_select != "") {
            $("#entrepreneurs #ents_presentation #" + this.entrepreneur_select).hide();
        }
        $("#entrepreneurs #ents_presentation #" + ent).show();
        this.entrepreneur_select = ent;
    },

    showEnt: function showEnt(ent) {
        if (this.entrepreneur_select != "") {
            $("#entrepreneurs #ents_presentation #" + this.entrepreneur_select).hide();
        }
        $("#entrepreneurs #ents_presentation #" + ent).show();
        this.entrepreneur_select = ent;
    },

    //Recherche Balise - Valeur DISTANCE & CONSEIL
    updateDistance: function updateDistance(distance) {

        if (distance < app.distanceMinToShowIndice) {
            $('#compass .conseil .valeur span').show();
        } else {
            $('#compass .conseil .valeur span').hide();
        }
        $('#compass .distance .valeur span').text(distance);
    },

    //Recherche Balise - Valeur PRECISION
    updatePrecision: function updatePrecision(precision) {
        $('#compass .precision .valeur span').text(precision);
    }
};

app.initialize();