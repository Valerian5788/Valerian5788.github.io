window.onload = () => {
    // Sélectionne le bouton avec l'attribut data-action="change"
    const button = document.querySelector('button[data-action="change"]');
    // Change le texte du bouton pour afficher un symbole
    button.innerText = '﹖';

    // Charge les emplacements statiques
    let places = staticLoadPlaces();
    // Affiche les modèles aux emplacements chargés
    renderPlaces(places);
};

// Fonction pour charger des emplacements statiques
function staticLoadPlaces() {
    return [
        {
            name: 'Pokèmon',
            location: {
                lat: 50.4758392,
                lng: 4.4726005,
            },
        },
    ];
}

// Définition des modèles avec leurs propriétés
var models = [
    {
        url: './assets/magnemite/scene.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];

// Index du modèle actuel
var modelIndex = 0;

// Fonction pour définir les propriétés du modèle sur une entité
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

// Fonction pour afficher les modèles aux emplacements spécifiés
function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        // Écouteur d'événement pour le bouton de changement de modèle
        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}
