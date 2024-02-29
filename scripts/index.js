class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor() {
        this.activities = [];
    }

    getAllActivities() {
        return this.activities;
    }

    createActivity(title, description, imgUrl) {
        const activity = new Activity(this.activities.length + 1, title, description, imgUrl);
        this.activities.push(activity);
        console.log(activity);
    }

    deleteActivity(id) {
        this.activities = this.activities.filter(activity => activity.id !== id);
    }
}

const Prueba = new Repository();

function createActivityCard(activityInstance) {
    const { id, title, description, imgUrl } = activityInstance;

    const cardContainer = document.createElement('div');
    const titleElement = document.createElement('h3');
    const descriptionElement = document.createElement('p');
    const imageElement = document.createElement('img');
    const deleteButton = document.createElement('button');

    titleElement.innerHTML = title;
    descriptionElement.innerHTML = description;
    imageElement.src = imgUrl;
    deleteButton.textContent = 'Eliminar';

    cardContainer.classList.add('activity-card');
    titleElement.classList.add('activity-card-title');
    descriptionElement.classList.add('activity-card-description');
    imageElement.classList.add('activity-card-image');
    deleteButton.classList.add('delete-button');

    deleteButton.addEventListener('click', function() {
        Prueba.deleteActivity(id);
        renderActivities();
    });

    cardContainer.appendChild(titleElement);
    cardContainer.appendChild(descriptionElement);
    cardContainer.appendChild(imageElement);
    cardContainer.appendChild(deleteButton);

    return cardContainer;
}

const formularioActividad = document.getElementById('formulario-Actividad');
const contenedorActividades = document.querySelector('.contenedor-actividades');

formularioActividad.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('tittle').value;
    const description = document.getElementById('description').value;
    const imgUrl = document.getElementById('imgUrl').value;

    if (!title || !description || !imgUrl) {
        alert('Por favor complete todos los campos.');
        return; 
    }
    Prueba.createActivity(title, description, imgUrl);
    contenedorActividades.appendChild(createActivityCard(Prueba.activities[Prueba.activities.length - 1]));
    formularioActividad.reset();
});

function renderActivities() {
    convertActivitiesToHTML('.contenedor-actividades');
}

function convertActivitiesToHTML(container) {
    const contenedorActividades = document.querySelector(container);
    
    contenedorActividades.innerHTML = '';

    const actividades = Prueba.getAllActivities();

    const elementosHTML = actividades.map(activity => createActivityCard(activity));

    elementosHTML.forEach(elemento => {
        contenedorActividades.appendChild(elemento);
    });
}
renderActivities();


convertActivitiesToHTML('.contenedor-actividades');
