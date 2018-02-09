// Contient les informations d'une équipe en train de jouer
function Team() {
    this.name =  null;
    this.level =  1;
    this.numParcours =  0;
    this.nbMarksFind = 0;
    this.nbAnswers = 0;
    this.score = 0;
    this.currentTime = null;
}

Team.prototype.saveLocalStorage = function() {

    var scores = JSON.parse(localStorage.getItem('scores'));

    if (scores === null)
        scores = [];

    scores.push(this);

    localStorage.setItem('scores', JSON.stringify(scores));
}
