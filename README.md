# Geok'H Mobile App
Geok'H est une application mobile de [geocaching](http://fr.wikipedia.org/wiki/Géocaching) proposée par le [Hubhouse](http://www.univ-lille1.fr/etudes/hubhouse).
C'est une application développée avec les technologies HTML5, CSS3 et JavaScript utilisant le framework Cordova.
L'affichage de Geok'H est optimisée pour les tablettes 10" et 7" et fonctionne correctement sur téléphone.

## Pré-requis
Installer le framework [Cordova](http://www.cordova.apache.org) 8.0.0 ou supérieur.
Pour plus d'informations sur l'installation, suivre la [documentation](http://cordova.apache.org/docs/en/latest/guide/cli/index.html).

## Installation
Forkez le projet disponible sur le GitHub du Hubhouse :

[GeokH-app](https://github.com/HubHouse-Lille/GeokH-app)

puis clônez le projet forké localement via la commande :

```bash
    $ git clone https://github.com/{your-username}/GeokH-app
```

## Lancement du projet
Ouvrez votre terminal et rendez-vous dans le dossier "GeokH-app" :

- Ajouter une plateforme Android : 

```bash
    $ cordova platform add android@6.3.0
```

- Lister les plateformes disponibles :

```bash
    $ cordova platforms ls
```

- Compiler l'application :

```bash
    $ cordova build android
```

Lancer le projet : 
```bash
    $ cordova run android
```

Pour plus d'informations sur le lancement d'un projet Cordova, suivre la procédure disponible sur la [documentation](http://cordova.apache.org/docs/en/latest/guide/cli/index.html)

## Architecture
Toute la partie développement se trouve dans le dossier "/www".

Comme le projet est une application Cordova, il est développé comme un site web "single page application".
Chaque vue correspond donc à une section dans le fichier "/www/index.html", c'est le point d'entrée de l'application.

### Structure du dossier /www
| Dossier | Description |
|---------|-------------|
| css | Les fichiers styles de l'application |
| img | Contient les images, logo, background etc. |
| js  | La logique de l'application est dans ce répertoire. Ce dossier est décomposé en deux sous-dossiers "class" et "lib" |
| js/class | Répertoire de tous les objets JS utilisés pour le bon fonctionnement de l'application |
| js/lib | Les librairies JQuery et autres codes externes |

A la racine du répertoire "/www" se trouve deux fichiers :

- function.js :
Gére les méthodes du chronomètre, de test de connexion à internet etc.

- App.js :
La logique, les enchainements des vues et des interactions utilisateurs se font dans cet objet.
Cet objet contient toute la logique applicative et délaisse quelques fonctionnalités au fichier "functions.js" ou dans les objets présents dans : "/www/js/class/...".

### Les classes :
- AjaxRequest contient les requêtes permettant de récupérer les informations des parcours sur l'API.
- Compass permet de décrypter la latitude et longitude d'une balise et de retourner la direction vers cette balise.
- Team est un objet décrivant une équipe qui permet de stocker les informations d'une partie en cours (score, nom de l'équipe, balise actuelle...).

(Non utilisé) ProgressBar permet d'afficher une barre de progression pour connaître l'avancée vers la balise en cours.

### Le code :
App.js décide quand est-ce qu'elle doit appeler une partie de la vue.

La fonction `initialize()` charge les données nécessaires au bon fonctionnement du jeu.
L'enchainement des vues est géré par la fonction `showView(viewId)` qui affiche la vue `viewId` et appelle la bonne fonction `showXXXView()` qui fait les calculs et les chargements spécifiques à la vue affichée.  

### L'API et le cache
Pour que le jeu soit lancé sur un nouvel appareil, cet appareil doit effectuer une "MAJ" qui permet de récupèrer les informations des parcours et de les stocker dans le cache.
La MAJ permet de récupèrer les nouvelles modifications effectuées sur l'[API](https://geokh.herokuapp.com/) mais aussi d'envoyer les scores réalisés par les équipes ayant fini le jeu.