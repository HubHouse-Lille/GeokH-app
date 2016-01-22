/* Fichier d'informations sur les questions du jeu
 *  une question est composé de : 
 *      un thème
 *      un objectif
 *      un type (QCM ou QCU)
 *      une difficulté (de 1 à 5)
 *      le libellé de la question
 *      la ou les propositions dans un tableau
 *      la ou les réponses dans un tableau 
 *      le retour de la question ( le retour est un tableau, chaque ligne correspond à un paragraphe, et un sous tableau correspond à une liste ))
 */
var questions = {
    "questions": {
        "question_1": {
            "theme": "L’entrepreneur",
            "objectifs": "Connaître la définition d’un entrepreneur",
            "type": "QCM",
            "difficulte": "2",
            "question": "Il existe plusieurs définitions du mot « Entrepreneur », parmi ces propositions laquelle ou les quelles définissent le mieux le mot « Entrepreneur » ?",
            "propositions": [
                "C’est un individu qui réussit à identifier son environnement une opportunité et qui arrive à réunir les ressources nécessaires pour l’exploiter en vue de créer de la valeur.",
                "L’entrepreneuriat est une dynamique de création et d’exploitation d’une opportunité d’affaires par un ou plusieurs individus via la création de nouvelles organisations à des fins de création de valeur.",
                "L’entrepreneur est l’être ingénieux qui sait habilement organiser les ressources de façon à développer et à commercialiser l’innovation."
            ],
            "reponses": [1, 3],
            "retour": [
                "Le terme entrepreneur recouvre différentes significations connexes mais distinctes :",
                [
                    "L'usage courant l'assimile à un chef d'entreprise, tantôt porteur d'un projet d'entreprise en phase de démarrage, tantôt dirigeant d'une entreprise davantage établie, à laquelle le plus souvent il s'identifie étroitement et personnellement ;",
                    "L'entrepreneur correspond également à l'appellation donnée aux chefs d'entreprise du secteur du bâtiment ou des travaux publics ;",
                    "En droit, l'entrepreneur (ou maître d'œuvre) désigne « la personne qui — dans un contrat d'entreprise — s'engage à effectuer un travail en réponse à la demande d'un maitre d'ouvrage."
                ]
            ]
        },
        "question_2": {
            "theme": "L’entrepreneur",
            "objectifs": "Connaître les valeurs Entrepreneuriales",
            "type": "QCM",
            "difficulte": "1",
            "question": "Parmi ces propositions, lesquelles correspondent à des valeurs entrepreneuriales ?",
            "propositions": [
                "Créativité",
                "Autonomie",
                "Entêtement",
                "Passion"
            ],
            "reponses": [1, 2, 4],
            "retour": [
                "Les valeurs entrepreneuriales sont nombreuses : Passion, Créativité, autonomie et sens des responsabilités, Ténacité,  Esprit d’équipe, confiance en soi, Leadership, délégation…",
                "L’entêtement n’est pas une valeur entrepreneuriale : S’il faut s’accrocher et se battre, il faut aussi savoir reconnaître ses erreurs d’appréciation et alors adapter son modèle aux réalités du terrain."
            ]
        },
        "question_3": {
            "theme": "Les services de Lille 1",
            "objectifs": "Connaître les services de Lille 1 susceptibles d’aider les étudiants ayant une intention entrepreneuriale…",
            "type": "QCM",
            "difficulte": "2",
            "question": "Parmi ces différents services de l’Université, lesquels peuvent vous informer, conseiller et accompagner dans la réalisation de vos projets de création d’activité (Entreprise ou association)",
            "propositions": [
                "Cré’Innov",
                "Service d’Activités Industrielles et Commerciales",
                "Service Relations extérieures, entreprises et communication",
                "HubHouse",
                "Service Vie Etudiante"
            ],
            "reponses": [1, 4, 5],
            "retour": [
                [
                    "Cré’Innov est un incubateur dédié à la détection, à l’accueil et à l’accompagnement de projets de création d’entreprises à caractère innovant et technologique.",
                    "Hubhouse est un service dédié aux étudiants ayant une intention Entrepreneuriale.",
                    "Service Vie Etudiante aide à la réalisation de projets associatifs."
                ],
                "Par contre le SAIC et le service Relations Extérieures, entreprises et communication n’ont pas vocation à informer, conseiller et accompagner dans la réalisation de vos projets de création d’activité."
            ]
        },
        "question_4": {
            "theme": "Le Hubhouse",
            "objectifs": "Connaître les activités du Hubhouse.",
            "type": "QCM",
            "difficulte": "1",
            "question": "Parmi ces différentes  propositions, lesquelles correspondent aux activités du Hubhouse ?",
            "propositions": [
                "Restitution du test MACE",
                "Pré-accompagnement des étudiants porteurs de projet",
                "Suivi après création",
                "Formation via les « soirées de l’étudiant créateur",
                "Financement des projets de création d’entreprise"
            ],
            "reponses": [1, 2, 4],
            "retour": [
                [
                    "Le test MACE (Motivation, Aptitude, Comportement Entrepreneurial) permet de mieux connaître votre profil entrepreneurial. Vous évaluez ainsi votre positionnement et vos pratiques puis avec l'aide d'un chef projet du Hubhouse vos compétences de dirigeant et de quelle manière les optimiser.",
                    "Avec le Hubhouse, vous bénéficierez d'un suivi individuel par un chargé de projet qui vous accompagne tout au long de votre démarche. Vous travaillerez avec lui sur la définition de votre projet, sur votre étude de marché et sur un prévisionnel financier simplifié.",
                    "Sous forme de cycles de conférences animées par des professionnels, la CCI Grand Lille et le Hubhouse de l'Université Lille 1 vous aident à concrétiser votre projet. Des modules pour entreprendre, apprendre, échanger, comprendre, étudier, évaluer, prévoir... avec des cas pratiques dans une dynamique collective et participative."
                ],
                "Le suivi après création et le financement des projets de création d’entreprise ne font pas partie des activités du Hubhouse."
            ]
        },
        "question_5": {
            "theme": "Création d’entreprise et expérience professionnelle",
            "objectifs": "",
            "type": "QCU",
            "difficulte": "1",
            "question": "Faut-il avoir une expérience professionnelle pour créer son entreprise ?",
            "propositions": [
                "oui",
                "non"
            ],
            "reponses": [2],
            "retour": [
                "Selon l’APCE, 34 % des jeunes créateurs se lancent sans expérience professionnelle.",
                "Le manque d’expérience peut être compensé par d’autres qualités."
            ]
        },
        "question_6": {
            "theme": "L’innovation",
            "objectifs": "Connaître les différentes formes d’innovation",
            "type": "QCM",
            "difficulte": "1",
            "question": "L’innovation peut prendre différentes formes ; parmi ces différentes propositions, lesquelles sont des formes d’innovation ?",
            "propositions": [
                "Innovation sociale",
                "Innovation produit",
                "Innovation humaine",
                "Innovation de procédé",
                "Innovation marketing"
            ],
            "reponses": [1, 2, 4, 5],
            "retour": [
                [
                    "Innovation sociale : cette forme d’innovation touche le management et la façon de piloter une entreprise",
                    "Innovation produit : un nouveau produit qui grâce à la technologie apporte des fonctionnalités nouvelles au client",
                    "Innovation de procédé : souvent invisible pour le client, l’innovation de procédé modifie la façon de fabriquer le produit et permet par exemple d’atteindre des fonctionnalités jusque-là inaccessibles, ou de réduire les coûts de fabrication.",
                    "Innovation marketing : il s’agit de modifier la façon de mettre en valeur le produit pour le vendre",
                    "Innovation humaine : ce n’est pas une forme d’innovation. On parle d’innovation organisationnelle : elle touche à la flexibilité de l’entreprise, à la participation des employés aux décisions et au développement de l’organisation"
                ]
            ]
        },
        "question_7": {
            "theme": "L’idée de création d’entreprise",
            "objectifs": "Connaître différentes pistes pour trouver une idée",
            "type": "QCM",
            "difficulte": "1",
            "question": "Comment trouver une idée de création d’entreprise ? Ces différentes méthodes proposées sont-elles correctes ?",
            "propositions": [
                "Observer son environnement",
                "Cultiver sa passion",
                "S’inspirer d’un concept déjà existant",
                "Lire la presse",
            ],
            "reponses": [1, 2, 3, 4],
            "retour": [
                [
                    "Bien des idées naissent à la suite d’une simple observation de votre environnement. Alors, soyez à l’écoute ! Demandes non satisfaites, failles dans un produit ou un service, les problèmes non résolus que vous identifiez peuvent vous inspirer des idées de produits ou de services.",
                    "Vous avez une passion pour la cuisine, la décoration ou le sport ? Pourquoi ne pas la transformer en business ? Partir d'une passion peut être un bon moyen de trouver une idée d'entreprise parce que vous êtes déjà expert dans votre domaine.",
                    "Une bonne technique pour trouver une idée de création d'entreprise, est de s'inspirer d'un concept qui marche à l'étranger ou même dans une autre région. Attention cependant aux différences culturelles et à la maturité de votre marché.",
                    "De nombreux magazines et/ ou médias font référence à des startups, des entrepreneurs, ou même directement à des idées de business."
                ]
            ]
        },
        "question_8": {
            "theme": "Statistiques de la création d’entreprise chez les jeunes",
            "objectifs": " Connaître les statistiques de création d’entreprise des moins de 30 ans",
            "type": "QCU",
            "difficulte": "1",
            "question": "En 2010, quel était le pourcentage des créateurs d’entreprise âgés de moins de 30 ans ?",
            "propositions": [
                "9%",
                "15%",
                "24%"
            ],
            "reponses": [3],
            "retour": [
                "En 2010, 24 % des créateurs d’entreprise avaient moins de 30 ans dont 8 % sont âgés de moins de 25 ans. Trois ans après leur création, 59 % des entreprises créées par des jeunes sont toujours en activité."
            ]
        },
        "question_9": {
            "theme": "Business Plan",
            "objectifs": "Le business-plan",
            "type": "QCM",
            "difficulte": "2",
            "question": "Quelles sont les différentes parties que l’on doit retrouver dans le Business-Plan ?",
            "propositions": [
                "L’étude de marché",
                "La description du brevet",
                "La présentation du porteur",
                "Les produits ou services proposés",
                "Le plan financier",
                "La stratégie commerciale"
            ],
            "reponses": [1, 3, 4, 5, 6],
            "retour": [
                "Le business plan  est un document qui doit définir et résumer la stratégie commerciale. Les différentes parties du Business plan sont :",
                [
                    "Le porteur de projet et la structure",
                    "Les produits ou services proposés",
                    "L’étude de marché",
                    "La stratégie commerciale",
                    "Les moyens nécessaires à la réalisation du projet",
                    "Le plan financier"
                ],
                "La description du brevet ne fait pas partie du business-plan. Cette description ne doit pas être divulguée notamment par rapport aux concurrents qui pourraient utiliser les informations."
            ]
        },
        "question_10": {
            "theme": "Etude de marché",
            "objectifs": "Les éléments à étudier pour une étude de marché.",
            "type": "QCM",
            "difficulte": "2",
            "question": "Parmi ces propositions, trouvez les éléments à étudier d’une étude de marché ?",
            "propositions": [
                "La demande (clientèle potentielle)",
                "Les associés",
                "L’offre (Concurrents directs et indirects)",
                "Les fournisseurs",
                "La réglementation"
            ],
            "reponses": [1, 3, 4, 5],
            "retour": [
                "Dans le cadre d’un projet de création d’entreprise, l’étude de marché consiste à analyser l’environnement, au sens large, de cette future entreprise.",
                "L’objectif de l’étude de marché est de mieux cerner et connaître ce futur environnement, afin de pouvoir prendre toutes les décisions en amont de la création en relation avec cet environnement.",
                "L’étude de marché permettra au créateur d’entreprise de cerner les attentes de ses futurs clients, leurs besoins, les atouts et faiblesses des concurrents…. afin de déterminer la faisabilité et la viabilité du projet."
            ]
        },
        "question_11": {
            "theme": "",
            "objectifs": "l’entrepreneur mystère",
            "type": "QCU",
            "difficulte": "1",
            "question": "Trouvez l’entrepreneur mystère qui correspond aux indices trouvés.",
            "propositions": [
                "entrepreneur_1",
                "entrepreneur_2",
                "entrepreneur_3"/*,
                 "entrepreneur_4"*/
            ],
            "reponses": [],
            "retour": []
        }
        /* Structure vide d'une question
         "question_x" : {
         "theme" : "",
         "objectifs" : "",
         "type" : "",
         "difficulte" : "",
         "question" : "",
         "propositions" : [],
         "reponses" : [],
         "retour" : []
         }
         */
    }
}