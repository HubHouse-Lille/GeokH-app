// Barre de progression entre le point de départ de l'utilisateur et la balise en cours
function ProgressBar() {
    this.destination = null;
    this.distanceAtDepart = 0;
    this.advancePercentage = 0;
    this.elementHTML = document.getElementById("progress-bar");
    this.elementFillingHTML = document.getElementsByClassName("progress-filling")[0];
    this.isInitialized = false;
}

ProgressBar.prototype.initialize = function(distanceAtDepart, destination) {
    this.isInitialized = true;
    this.destination = destination;
    this.distanceAtDepart = Number(distanceAtDepart);
    this.elementHTML.style["display"] = "block";
    this.elementFillingHTML.style["width"] = 0;
};

ProgressBar.prototype.draw = function(newDistance) {
    this.advancePercentage = (100 - (100 * newDistance) / (this.distanceAtDepart)) + "%"
    this.elementFillingHTML.style["width"] = this.advancePercentage;
};
